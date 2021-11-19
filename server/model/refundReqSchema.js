const mongoose = require('mongoose');

const refundReqSchema = mongoose.Schema({
    orderID:String,
    recallReason:String
})

const refundReq = mongoose.model('refundReq',refundReqSchema);

module.exports={refundReq}