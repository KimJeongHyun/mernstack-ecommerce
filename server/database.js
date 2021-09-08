const config = require('./config/config.json')


module.exports = function(){
    const password = config.password
    const mongoose = require('mongoose')
    return {
        db_open : function(){
            mongoose.connect(`mongodb+srv://sliderDB:${encodeURIComponent(password)}@imgsliderdb.q6ife.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
                useNewUrlParser:true, 
                useUnifiedTopology: true
            }).then(() => console.log('MongoDB Connected'))
        }
    }
}