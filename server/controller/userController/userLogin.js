const {users} = require('../../model/userSchema')

const router = require('express').Router();
const crypto = require('crypto');

const database = require('../../database')();

database.db_open();

router.post('/api/login',(req,res)=>{
    const ID = req.body.ID;
    const Password = req.body.Password;
    if ((ID=='' || Password=='') || (ID=='' && Password=='')){
        res.send({loginSuccess:false})
    }else{
        users.findOne({userID:ID},function(err,notice_dt){
            if (notice_dt!=null){
                const dtPW = notice_dt.password;
                const salt=notice_dt.salt;
                crypto.pbkdf2(Password,salt,108326,64,'sha512',(err,key)=>{
                    const hashedPw = key.toString('base64');
                    if (dtPW==hashedPw){
                        // 세션값 저장 필요
                        res.send({loginSuccess:true});
                    }else{
                        res.send({loginSuccess:false});
                    }
                })
            }else{
                res.send({loginSuccess:false});
            }
            
        })
    }
})

module.exports = router;