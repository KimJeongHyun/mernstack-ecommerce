const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const clothSchema = mongoose.Schema({
    clothImgPath:String,
    clothName:String,
    sellNum:Number,
    reviewNum:Number,
    deliverySol:String,
    exportRange:String,
    sellPrice:Number,
    discountRate:Number,
    clothIndex:{
        type:Number,
        default:0
    }
})

clothSchema.plugin(autoIncrement.plugin,{
    model:'cloth',
    field:'clothIndex',
    startAt:1,
    increment:1
})

const cloth = mongoose.model('cloth',clothSchema);

module.exports={cloth}