const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const NoticeSchema = mongoose.Schema({
    userID:String,
    title:String,
    content:String,
    regDate:{
        type:Date,
        default:Date.now
    },
    NoticeIndex:{
        type:Number,
        default:0
    }
})

NoticeSchema.plugin(autoIncrement.plugin,{
    model:'Notice',
    field:'NoticeIndex',
    startAt:1,
    increment:1
})

const Notice = mongoose.model('Notice',NoticeSchema);

module.exports={Notice}