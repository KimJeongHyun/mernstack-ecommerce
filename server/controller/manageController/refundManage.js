const {orders} = require('../../model/orderSchema')
const {refundReq} = require('../../model/refundReqSchema')
const router = require('express').Router();

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

module.exports = router;