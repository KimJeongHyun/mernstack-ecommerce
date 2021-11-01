const {users} = require('../../model/userSchema')
const {accumLog} = require('../../model/accumLogSchema')
const {coupons} = require('../../model/couponSchema');
const router = require('express').Router();
const crypto = require('crypto');
const mongoose = require('mongoose');


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
                            _id:new mongoose.Types.ObjectId(),
                            userName:userName,
                            userID:userID,
                            password:hashedPw,
                            userEmail:userEmail,
                            userPhone:userPhone,
                            salt:salt
                        })
                        
                        userInfo.save().then(function(product){
                            const userAccum = new accumLog({
                                userID:userInfo._id,
                                reason:'신규 가입 축하 적립금',
                                addAccum:3000,
                                totalAccum:3000
                            })

                            const userCoupon = new coupons({
                                userID:userInfo._id,
                                reason:'신규 가입 축하 쿠폰',
                                couponVolume:3000
                            })

                            userAccum.save().then(function(product){
                                console.log('userAccum saved')
                            }, function rejected(err){
                                console.log(err);
                                console.log('accumLog save error');
                            })

                            userCoupon.save().then(function(product){
                                console.log('userCoupon saved')
                            }, function rejected(err){
                                console.log(err);
                                console.log('coupon save error')
                            })

                            res.json({registerSuccess:true})

                        }, function rejected(err){
                            console.log(err);
                            console.log('userInfo save error');
                            res.json({registerSuccess:false})
                        })
                    })
                })
            }else{
                res.json({registerSuccess:false})
            }
        })
    }else{
        res.json({registerSuccess:false})
    }
})

module.exports = router;