const {orders} = require('../../model/orderSchema')
const {refundReq} = require('../../model/refundReqSchema')
const {accumLog} = require('../../model/accumLogSchema')
const {coupons} = require('../../model/couponSchema')
const {users} = require('../../model/userSchema')
const config = require('../../config/config.json')
const nodemailer = require('nodemailer')

const router = require('express').Router();


router.post('/api/refundRequest',(req,res)=>{
    const reqData = req.body;   
    const orderID = reqData.orderID;
    const recallReason = reqData.recallReason;

    orders.findOneAndUpdate({orderID:orderID},
        {refundWhether:true},function(err){
            if (err) res.send({status:false})
            else{
                const refundInfo = new refundReq({
                    orderID:orderID,
                    recallReason:recallReason
                })
                refundInfo.save(function(err,result){
                    if (err) res.send({status:false})
                    else res.send({status:true})
                })
            }
        }
    )
})

router.get('/api/getRefund',(req,res)=>{
    orders.find({refundWhether:true},function(err,resRefund){
        if (err) res.send({status:false})
        else{
            res.send({status:true,refundList:resRefund})
        }
    })
})

router.post('/api/getRefundReason',(req,res)=>{
    const reqData = req.body;
    const orderID = reqData.orderID;

    refundReq.findOne({orderID:orderID},function(err,resReason){
        if (err) res.send({status:false})
        else{
            res.send({status:true,reasonList:resReason})
        }
    })
})

router.post('/api/recallRequest',(req,res)=>{
    const reqData = req.body;
    const orderID = reqData.orderID;
    const userID = reqData.userID;
    const buyeremail = reqData.buyeremail;
    const usedAccum = reqData.usedAccum;
    const couponName = reqData.couponName;
    const couponVolume = reqData.couponVolume;
    let couponTTL='';
    if (reqData.couponTTL!==undefined){
        couponTTL = new Date(reqData.couponTTL)
    }
    let flag = 'done';
    
    const orderDBWork = () =>{
        orders.findOne({orderID:orderID},function(err,result){
            if (err) flag = 'orderDBWork find Err'
            else{
                if ((typeof result)==='object'){
                    const goodname = result.goodname+' (?????? ??????)';
                    orders.updateOne({orderID:orderID},
                        {goodname:goodname,refundWhether:false},
                        function(err,result){
                            if (err) flag='orderDBWork update Err'
                    })
                }
            }
        })
    }

    const accumDBWork = () =>{
        users.findOne({userID:userID},function(err,result){
            const dbID = result._id;
            accumLog.findOne({userID:{'$in':[dbID]}},function(err,result){
                if (err) flag = 'accumDBWork find Err'
                else{
                    if ((typeof result)==='object'){
                        const sumAccum = parseInt(result.totalAccum)+parseInt(usedAccum);
                        accumLog.updateOne(
                            {userID:{'$in':[dbID]}},
                            {'$push':{
                                reason:'?????? ??????',
                                addAccum:usedAccum
                            },totalAccum:sumAccum},
                            function(err){
                                if (err) flag = 'accumDBWork update Err'
                            } 
                        )
                    }
                }
            })
        })
        
    }

    const couponDBWork = () =>{
        users.findOne({userID:userID},function(err,result){
            const dbID = result._id;
            coupons.findOne({reason:couponName},function(err,result){
                if (err) flag='couponDBWork find Err'
                else{
                    const dtNow = new Date(Date.now());
                    dtNow.setUTCHours(0,0,0,0)
                    if (typeof result === 'object'){
                        if (dtNow.getTime() - couponTTL.getTime()<0){
                            const newCoupon = new coupons({
                                userID:[],
                                reason:couponName,
                                couponVolume:couponVolume,
                                createdAt:dtNow,
                                expiredAt:couponTTL
                            })
    
                            newCoupon.save().then(function(product){
                                coupons.updateOne({reason:couponName},{'$push':{
                                    userID:dbID
                                }},function(err){
                                    if (err) flag='couponDBWork Update Err'
                                })
                            },function rejected(err){
                                if (err) flag='couponDBWork Update rejected'
                            })
                        }
                    }else{
                        coupons.updateOne({reason:couponName},{'$push':{
                            userID:userID
                        }},function(err){
                            if (err) flag='couponDBWork Update Err'
                        })
                    }
                }
            })
        })
    }

    const sendMail = () =>{
        let transporter = nodemailer.createTransport({
            // ??????????????? ?????? ?????????, gmail???????????? ????????? ??????????????? 'gmail'
            service: 'gmail',
            // host??? gmail??? ??????
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              // Gmail ?????? ??????, 'testmail@gmail.com'
              user: config.gU,
              // Gmail ???????????? ??????
              pass: config.gP
            },
        });
    
        const worker = async () =>{
            let info = await transporter.sendMail({
                // ????????? ?????? ?????????, ?????? ????????? ??????
                from: `Sympst Team <${config.gU}>`,
                // ?????? ?????? ?????? ????????? ??????
                to: 'ptr1129@naver.com',
                // ????????? ????????? ????????? ??????
                subject: `[${orderID}][${userID}] ????????? ?????????????????????.`,
                // ????????? ????????? ????????? ??????
                // text: ?????? text??? ????????? ??????
                // html: html??? ????????? ?????? html: `<b>${generatedAuthNumber}</b>`,
                text: `??????????????? ${userID} ?????????!\n\n???????????? ???????????? ${orderID}??? ?????? ????????? ?????????????????????.\n\n????????? ?????? ?????? ????????? ????????? ?????? ??????, ???????????? ?????? Help ?????? ?????? 1:1 ?????? ??????????????????.
                `
            });

        }
    
        worker();
    }

    const totalWork = async () =>{
        await orderDBWork();
        if (parseInt(usedAccum)>0){
            await accumDBWork();
        }
        if (couponName!=='none'){
            await couponDBWork();
        }

        if (flag==='done'){
            await sendMail();
            res.send({status:true})
        }else{
            res.send({status:false, flag:flag})
        }

        
    }
    

    totalWork();
    
})

module.exports = router;