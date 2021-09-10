const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const userLogin = require('./controller/userController/userLogin')
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

app.use(userLogin);
app.use(userRegister);

app.get('/api/hello',(req,res)=>res.send('hello'))

const server = http.createServer(app);
server.listen(port, ()=>console.log(`Server Start. Port : ${port}`))


