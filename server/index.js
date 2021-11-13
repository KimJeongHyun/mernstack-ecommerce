const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const path = require('path');
const config = require('./config/config.json')

const userLogin = require('./controller/userController/userLogin')
const userLogout = require('./controller/userController/userLogout')
const userRegister = require('./controller/userController/userRegister');

const getClothes = require('./controller/storeController/getClothData')
const getDetailData = require('./controller/storeController/getDetailData')

const getQnAData = require('./controller/storeController/getQnAData');
const postQnAData = require('./controller/storeController/postQnA');
const clearQnA = require('./controller/storeController/clearQnA')

const getReviewData = require('./controller/storeController/getReviewData');
const postReviewData = require('./controller/storeController/postReview');
const clearReview = require('./controller/storeController/clearReview');

const getNotice = require('./controller/boardController/getNotice');
const postNotice = require('./controller/boardController/postNotice');
const clearNotice = require('./controller/boardController/clearNotice')

const getCart = require('./controller/cartController/getCart')
const postCart = require('./controller/cartController/postCart')
const clearCart = require('./controller/cartController/clearCart')

const clientMail = require('./controller/helpController/clientMail')

const dbInsert = require('./controller/manageController/dbInsert')
const userManage = require('./controller/manageController/userManage')

const getUser = require('./controller/userController/getUser')
const getUserPage = require('./controller/userController/getUserPage')

const order = require('./controller/payController/order');

const port = 5000;

app.use(express.json({
    limit:'50mb'
})); 
app.use(express.urlencoded({
    limit:'50mb',extended : true
})) 

app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'./views/inicisPay'));

const express_session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(express_session({
    secret:config.secret,
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({mongoUrl:`mongodb+srv://sliderDB:${encodeURIComponent(config.password)}@imgsliderdb.q6ife.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`})
    //cookie:{maxAge:1000*60*60}
}))

const database = require('./database')();

database.db_open();

app.use(userLogin);
app.use(userLogout);
app.use(userRegister);

app.use(getClothes);
app.use(getDetailData);

app.use(getQnAData);
app.use(postQnAData);
app.use(clearQnA);

app.use(getReviewData);
app.use(postReviewData);
app.use(clearReview);

app.use(getNotice);
app.use(postNotice);
app.use(clearNotice);

app.use(getCart);
app.use(postCart);
app.use(clearCart);

app.use(clientMail);

app.use(dbInsert);
app.use(userManage);

app.use(getUser);
app.use(getUserPage);
app.use(order);

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
process.on('uncaughtException', (err) => {})

