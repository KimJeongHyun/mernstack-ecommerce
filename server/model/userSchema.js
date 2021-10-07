const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const userSchema = mongoose.Schema({
    userName:String,
    userID:String,
    password:String,
    userEmail:String,
    userPhone:Number,
    CartItem:[{
        clothIndex:{
            type:Number
        },
        clothImgPath:String,
        clothName:String,
        sellPrice:{
            type:Number
        },
        discountRate:{
            type:Number
        },
        quantity:{
            type:Number    
        }
    }],
    accumVolume:Number,
    salt:String,
    seq:{
        type:Number,
        default:0
    }
})

userSchema.plugin(autoIncrement.plugin,{
    model:'users',
    field:'seq',
    startAt:1,
    increment:1
})

const users = mongoose.model('users',userSchema);

module.exports={users}