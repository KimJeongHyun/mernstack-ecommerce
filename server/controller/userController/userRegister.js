const {users} = require('../../model/userSchema')

const router = require('express').Router();
const crypto = require('crypto');

const database = require('../../database')();

database.db_open();

router.post('/api/register',(req,res)=>{

    const userName = req.body.Name;
    const userID = req.body.ID;
    const password = req.body.Password;
    const password2 = req.body.Password2;
    const userEmail = req.body.Email;
    const userPhone = req.body.Phone; 

    if (password==password2){
        users.findOne({userID:userID},function(err,notice_dt){
            if (notice_dt==null){
                crypto.randomBytes(64,(err,buf)=>{
                    crypto.pbkdf2(password,buf.toString('base64'),108326,64,'sha512',(err,key)=>{
                        const hashedPw = key.toString('base64');
                        const salt= buf.toString('base64');
        
                        const userInfo = new users({
                            userName:userName,
                            userID:userID,
                            password:hashedPw,
                            userEmail:userEmail,
                            userPhone:userPhone,
                            salt:salt
                        })
        
                        userInfo.save().then(function(product){
                            console.log('Registered');
                        }, function rejected(err){
                            console.log(err);
                            console.log('Something err...');
                        })
        
                    })
                })
                res.json({registerSuccess:true})
            }else{
                res.json({registerSuccess:false})
            }
        })
    }else{
        res.json({registerSuccess:false})
    }
})

module.exports = router;