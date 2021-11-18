const router = require('express').Router();
const encryptSha256 = require('../../libs/encrypt')
const config = require('../../config/config.json')
const {orders} = require('../../model/orderSchema')
const crypto = require('crypto');

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

const getOrder = (orderId) =>{
    let result = '';
    orders.findOne({orderID:orderId}, function(err,order){
        result = order;
    })
    return result;
}

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
        orders.findOneAndUpdate({orderID:orderNumber},
            {confirmWhether:true,expiredAt:expireTTL},function(err){
                if (err) console.log(err)
                else return res.redirect('http://localhost:3000' + `/payment/close`);
            })
        // 결제 관련 데이터 처리
        // 여기서 DB confirm을 true로 돌린다.
        // TTL 범위를 현재 시각으로부터 1년 뒤로 지정한다.
        // 약관에 구매내역은 1년 유지된다고 올려야한다. 
        // orderNumber로 DB 조회하면 된다.
    } else {
        // 결제 실패 처리
        return res.redirect('http://localhost:3000' + `/payment/close`);
    }
    
};

router.post('/api/v1/inicis/pay/after',(req,res)=>{
    return onSavePaymentInfo(req,res);
})

module.exports = router;