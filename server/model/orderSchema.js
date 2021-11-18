const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderID:String,
    userID:String,
    goodname:String,
    buyername:String,
    buyertel:Number,
    buyeremail:String,
    usedAccum:Number,
    usedCoupon:Number,
    couponID:String,
    couponName:String,
    totalPrice:Number,

    confirmWhether:{
        type:Boolean,
        default:false
    },
    refundWhether:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    expiredAt:{
        type:Date,
        expires:0
    }
})

const orders = mongoose.model('orders',orderSchema);


module.exports={orders}