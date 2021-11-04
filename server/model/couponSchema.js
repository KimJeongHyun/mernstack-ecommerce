const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
    userID:[{
        type:mongoose.Schema.Types.ObjectId,ref:'users'
    }],
    reason:String,
    couponVolume:Number,
    regDate:{
        type:Date,
        default:Date.now
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

const coupons = mongoose.model('coupons',couponSchema);

module.exports={coupons}