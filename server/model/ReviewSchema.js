const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const ReviewSchema = mongoose.Schema({
    userName:String,
    userID:String,
    clothName:String,
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

ReviewSchema.plugin(autoIncrement.plugin,{
    model:'QnA',
    field:'seq',
    startAt:1,
    increment:1
})

const Review = mongoose.model('Review',ReviewSchema);

module.exports={Review}