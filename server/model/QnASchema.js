const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const QnASchema = mongoose.Schema({
    userName:String,
    userID:String,
    clothIndex:Number,
    title:String,
    content:String,
    password:String,
    regDate:{
        type:Date,
        default:Date.now
    },
    seq:{
        type:Number,
        default:0
    }
})

QnASchema.plugin(autoIncrement.plugin,{
    model:'QnA',
    field:'QnAIndex',
    startAt:1,
    increment:1
})

const QnA = mongoose.model('QnA',QnASchema);

module.exports={QnA}