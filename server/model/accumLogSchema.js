const mongoose = require('mongoose');

const accumLogSchema = mongoose.Schema({
    userID:[{
        type:mongoose.Schema.Types.ObjectId,ref:'users'
    }],
    reason:String,
    addAccum:Number,
    totalAccum:Number,
    regDate:{
        type:Date,
        default:Date.now
    }
})

const accumLog = mongoose.model('accumLog',accumLogSchema);

module.exports={accumLog}