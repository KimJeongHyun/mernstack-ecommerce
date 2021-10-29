const {users} = require('../../model/userSchema')

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
    
    if (reqData.reason==='' || reqData.addAccum==='' || reqData.checkList.length===0){
        res.json({postSuccess:false})
    }
    if (reqData.reason!=='' && reqData.addAccum!=='' && reqData.checkList.length!==0){
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