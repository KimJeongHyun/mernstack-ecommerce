const {users} = require('../../model/userSchema')
const {accumLog} = require('../../model/accumLogSchema')
const {coupons} = require('../../model/couponSchema');
const mongoose = require('mongoose')
const router = require('express').Router();

router.get('/api/getUsers',(req,res)=>{
    users.find({}, function(err,users){
        var usersMap={};
        var cnt = 0;
        users.forEach(function(user){
            usersMap[cnt] = user;
            cnt=cnt+1;
        })
        res.json({getUserSuccess:true,usersMap:usersMap,length:users.length})
    })
})

router.post('/api/updateAccum',(req,res)=>{
    const reqData = req.body;
    const reason = reqData.reason;
    const addAccum = reqData.addAccum;
    const checkList = reqData.checkList;
    if (reason==='' || addAccum==='' || checkList.length===0){
        res.json({postSuccess:false})
    }
    if (reason!=='' && addAccum!=='' && checkList.length!==0){
        for (let i=0; i<checkList.length; i++){
            users.find({_id:checkList[i]},function(err,user){
                if (err){
                    console.log('user find err');
                    console.log(err);
                    res.json({postSuccess:false})
                }else{
                    const objectId = user[0]._id
                    accumLog.findOne({userID:{'$in':[objectId]}},function(err,accum){
                        const sumAccum = parseInt(accum.totalAccum)+parseInt(addAccum);
                        accumLog.updateOne(
                            {userID:{'$in':[objectId]}},
                            {'$push':{
                                reason:reason,
                                addAccum:addAccum
                            },totalAccum:sumAccum},
                            function(err){
                                if (err){
                                    console.log('accum update err');
                                    console.log(err);
                                }else{
                                    console.log('accum Updated');
                                } 
                            }
                        )
                    })
                }  
            })
        }
        res.json({postSuccess:true})
    }
})

router.post('/api/addCoupon',(req,res)=>{
    const reqData = req.body;
    const reason = reqData.reason;
    const couponVolume = reqData.couponVolume;
    const couponDuration = reqData.couponDuration;
    const dtNow = new Date()
    dtNow.setUTCHours(0,0,0,0)
    const dtVar = new Date(Date.now()+couponDuration*24*3600*1000)
    dtVar.setUTCHours(0,0,0,0);
    
    const checkList = reqData.checkList;

    if ((reason==='' || couponVolume==='') && checkList.length===0){
        res.json({postSuccess:false})
    }

    if (reason!=='' && couponVolume!=='' && checkList.length!==0){
        coupons.find({reason:reason},function(err,fieldReason){
            if (fieldReason.length==0){
                const newCoupon = new coupons({
                    userID:[],
                    reason:reason,
                    couponVolume:couponVolume,
                    createdAt:dtNow,
                    expiredAt:dtVar
                })

                newCoupon.save().then(function(product){
                    for (let i=0; i<checkList.length; i++){
                        const objectId = mongoose.Types.ObjectId(checkList[i])
                        coupons.updateOne({reason:reason},{'$push':{
                            userID:objectId
                        }},function(err){
                            if (err){
                                console.log(checkList[i]);
                                console.log(err);
                                console.log('new coupon update err')
                            }else{
                                console.log('new coupon created with update users');
                            }
                        })
                    }
                },function rejected(err){
                    if (err){
                        console.log(err);
                        console.log('newCoupon create err');
                    }
                })
            }else{
                for (let i=0; i<checkList.length; i++){
                    const objectId = mongoose.Types.ObjectId(checkList[i])
                    coupons.updateOne({reason:reason,userID:{'$nin':[objectId]}},{'$push':{
                        userID:objectId
                    }},function(err){
                        if (err){
                            console.log(checkList[i]);
                            console.log(err);
                            console.log('existed coupon push error');
                        }else{
                            console.log('existed coupon updated')
                        }
                    })
                }
            }
        })
        res.json({postSuccess:true})
    }else if (reason!=='' && couponVolume!=='' && checkList.length===0){
        const newCoupon = new coupons({
            userID:[],
            reason:reason,
            couponVolume:couponVolume,
            createdAt:dtNow,
            expiredAt:dtVar
        })
        newCoupon.save(function(err,result){
            if (err){
                console.log(err);
            }else{
                console.log('new coupon created')    
            }
        })
        
        
    }
})

module.exports = router;