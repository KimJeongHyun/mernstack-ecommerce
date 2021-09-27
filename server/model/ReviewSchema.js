const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const ReviewSchema = mongoose.Schema({
    userID:String,
    clothIndex:Number,
    clothName:String,
    title:String,
    content:String,
    password:String,
    regDate:{
        type:Date,
        default:Date.now
    },
    ReviewIndex:{
        type:Number,
        default:0
    }
})

ReviewSchema.plugin(autoIncrement.plugin,{
    model:'Review',
    field:'ReviewIndex',
    startAt:1,
    increment:1
})

const Review = mongoose.model('Review',ReviewSchema);

module.exports={Review}