const router = require('express').Router();
const encryptSha256 = require('../../libs/encrypt')
const config = require('../../config/config.json')
const {orders} = require('../../model/orderSchema')
const {users} = require('../../model/userSchema')
const {accumLog} = require('../../model/accumLogSchema')
const {coupons} = require('../../model/couponSchema')
const crypto = require('crypto')


router.post('/api/getOrder',(req,res)=>{
    const reqData = req.body;
    const goodName = reqData.clothName;
    const buyertel = reqData.userPhone;
    const buyerEmail = reqData.userEmail;

    const userID = req.session.userID;
    const accum = reqData.accum;
    const couponID = reqData.couponID;
    const couponName = reqData.couponName;
    const couponVolume = reqData.couponVolume;
    const couponTTL = reqData.couponTTL;
    const price = reqData.totalPrice;

    const host = config.host;

    const timestamp = new Date().getTime();

    let orderId=Date.now()+'_'+crypto.randomBytes(8).toString('hex')
    
    const tempTTL = new Date(Date.now()+60*1000)
    
    const saveOrder = () =>{

        const orderInfo = new orders({
            orderID:orderId,
            userID:userID,
            goodname:goodName,
            buyername:userID,
            buyertel:parseInt(buyertel),
            buyeremail:buyerEmail,
            usedAccum:accum,
            usedCoupon:couponVolume,
            couponID:couponID,
            couponName:couponName,
            couponTTL:couponTTL,
            totalPrice:price,
            expiredAt:tempTTL
        })
        orderInfo.save(function(err,result){
            if(err) console.log(err);
        })
    }

    const totalWork = async () =>{
        await saveOrder();
        const dataset = {
            version: '1.0',
            gopaymethod: 'VBank',
            mid: 'INIpayTest',
            signature: encryptSha256(`oid=${orderId}&price=${price}&timestamp=${timestamp}`),
            mKey: encryptSha256('SU5JTElURV9UUklQTEVERVNfS0VZU1RS'), // 개발용, 배포용에서는 발급된 key를 사용
            price:price,
            oid: orderId,
            timestamp:timestamp,
            currency: 'WON',
            goodname: goodName,
            buyername: userID,
            buyertel: buyertel,
            buyeremail: buyerEmail,
            returnUrl: host+`/api/v1/inicis/pay/after`,
            payViewType: 'popup',
            popupUrl: host + `/api/v1/inicis/popup/open/${orderId}`,
            closeUrl: '',
        }
        res.send({ status: 'success', data: dataset });
    }
    totalWork();
})

const openInicisModule = (req,res) =>{
    const {orderId} = req.params;

    const timestamp = new Date().getTime();
    const host = config.host;

    orders.findOne({orderID:orderId},function(err,order){
        const goodname = order.goodname;
        const buyername = order.buyername;
        const buyertel = order.buyertel;
        const buyeremail = order.buyeremail;
        const price = order.totalPrice;
        const dataset = {
            version: '1.0',
            gopaymethod: 'VBank',
            mid: 'INIpayTest',
            signature: encryptSha256(`oid=${orderId}&price=${price}&timestamp=${timestamp}`),
            mKey: encryptSha256('SU5JTElURV9UUklQTEVERVNfS0VZU1RS'), // 개발용, 배포용에서는 발급된 key를 사용
            price:price,
            oid: orderId,
            timestamp:timestamp,
            currency: 'WON',
            goodname: goodname,
            buyername: buyername,
            buyertel: buyertel,
            buyeremail: buyeremail,
            returnUrl: host+`/api/v1/inicis/pay/after`,
            payViewType: 'popup',
            popupUrl: host + `/api/v1/inicis/popup/open/${orderId}`,
            closeUrl: '',
        }
        res.render('w_inicis', { ...dataset });
        
    })
    
}

router.get('/api/v1/inicis/popup/open/:orderId',(req,res)=>{
    return openInicisModule(req,res);
})

const onSavePaymentInfo = async (req, res) => {
    const { authUrl, authToken, orderNumber, mid, charset, resultCode } = req.body;
    // 0000이면 결제성공
    
    if (resultCode === '0000') {
        const expireTTL = new Date(Date.now()+365*24*3600*1000)
        console.log('payment save....')
        if (req.session.userID!==undefined){
            console.log(req.session.userID);
            orders.findOneAndUpdate({orderID:orderNumber},
                {confirmWhether:true,expiredAt:expireTTL},function(err){
                    if (err) console.log(err)
                    else {
                        console.log('order found...')
                        orders.findOne({orderID:orderNumber},function(err,result){
                            console.log('order found success...')
                            const usedAccum=result.usedAccum;
                            const couponName=result.couponName;
                            users.findOne({userID:req.session.userID},function(err,result){
                                if (err) console.log(err)
                                else{
                                    const userID = result._id;
                                    if (usedAccum>0){
                                        console.log('accum used...');
                                        accumLog.findOne({userID:{'$in':[userID]}},
                                            function(err,accum){
                                                const sumAccum=parseInt(accum.totalAccum)-parseInt(usedAccum);
                                                accumLog.updateOne(
                                                    {userID:{'$in':[userID]}},
                                                    {'$push':{
                                                        reason:'적립금 사용',
                                                        addAccum:usedAccum*-1
                                                    },totalAccum:sumAccum},
                                                    function(err){
                                                        if (err){
                                                            console.log('accum update err');
                                                            res.send({status:false})
                                                        }else{
                                                            console.log('accum Updated')
                                                            res.send({status:true})
                                                        }
                                                    }
                                                )
                                            }
                                        )
                                    }
                                    if (couponName==='신규 가입 축하 쿠폰'){
                                        console.log('new user coupon...');
                                        const userID = result._id;
                                        coupons.findOneAndDelete({reason:'신규 가입 축하 쿠폰',userID:{'$in':[userID]}},function(err,result){
                                            
                                        })
                                    }
                                }    
                            })
                        })
                    }
                }
            )
        }else{
            res.send({status:false})
        }
    } else {
        // 결제 실패 처리
        return res.redirect('http://localhost:3000' + `/payment/close`);
    }
    
};

router.post('/api/v1/inicis/pay/after',(req,res)=>{
    return onSavePaymentInfo(req,res);
})

module.exports = router;