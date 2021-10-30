const mongoose = require('mongoose');
const {users} = require('../../model/userSchema')
const {accumLog} = require('../../model/accumLogSchema')
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
                const objectId = user[i]._id
                accumLog.findOne({userID:{'$in':[objectId]}},function(err,accum){
                    const sumAccum = parseInt(accum.totalAccum)+parseInt(addAccum);
                    console.log(sumAccum)
                    accumLog.updateOne(
                        {userID:{'$in':[objectId]}},
                        {'$push':{
                            reason:reason,
                            addAccum:addAccum
                        },totalAccum:sumAccum},
                        function(err){
                            if (err) console.log(err);
                        }
                    )
                })
            })
        }
        res.json({postSuccess:true})
    }
})

router.post('/api/addCoupon',(req,res)=>{
    const reqData = req.body;
    
    if (reqData.reason==='' || reqData.couponValue==='' || reqData.checkList.length===0){
        res.json({postSuccess:false})
    }

    if (reqData.reason!=='' && reqData.couponValue!=='' && reqData.checkList.length!==0){
        res.json({postSuccess:true})
    }

    
})

module.exports = router;