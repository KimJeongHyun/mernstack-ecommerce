const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const config = require('./config/config.json')

const userLogin = require('./controller/userController/userLogin')
const userLogout = require('./controller/userController/userLogout')
const userRegister = require('./controller/userController/userRegister');
const getClothes = require('./controller/storeController/getClothData')
const getDetailData = require('./controller/storeController/getDetailData')
const getQnAData = require('./controller/storeController/getQnAData');
const getReviewData = require('./controller/storeController/getReviewData');

const port = 5000;

app.use(express.json({
    limit:'50mb'
})); 
app.use(express.urlencoded({
    limit:'50mb',extended : true
})) 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');



const express_session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(express_session({
    secret:config.secret,
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({mongoUrl:`mongodb+srv://sliderDB:${encodeURIComponent(config.password)}@imgsliderdb.q6ife.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`}),
    cookie:{maxAge:(3.6e+6)*24}
}))

app.use(userLogin);
app.use(userLogout);
app.use(userRegister);
app.use(getClothes);
app.use(getDetailData);
app.use(getQnAData);
app.use(getReviewData);

app.get('/api/hello',(req,res)=>res.send('hello'))
app.get('/api/getSession',(req,res)=>{
    if (typeof req.session.userID!=='undefined'){
        res.send({isAuth:true,ID:req.session.userID,length:1});
    }else{
        res.send({isAuth:false,ID:req.session.userID,length:0});
    }
})

const server = http.createServer(app);
server.listen(port, ()=>console.log(`Server Start. Port : ${port}`))


