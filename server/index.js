const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const config = require('./config/config.json')

const userLogin = require('./controller/userController/userLogin')
const userLogout = require('./controller/userController/userLogout')
const userRegister = require('./controller/userController/userRegister');


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

app.get('/api/hello',(req,res)=>res.send('hello'))
app.get('/api/getSession',(req,res)=>{
    res.send(req.session.userID);
})

const server = http.createServer(app);
server.listen(port, ()=>console.log(`Server Start. Port : ${port}`))


