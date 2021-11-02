const {users} = require('../../model/userSchema')
const {accumLog} = require('../../model/accumLogSchema')
const {coupons} = require('../../model/couponSchema')

const router = require('express').Router();

router.get('/api/getAccumLog',(req,res)=>{
    const ID = req.session.userID;
    users.findOne({userID:ID},function(err,user){
        accumLog.find({userID:{$in:user._id}},function(err,accums){
            if (accums.length>0){
                const reasonList = accums[0].reason;
                const accumList = accums[0].addAccum;
                const totalAccum = accums[0].totalAccum;

                res.json({getAccumSuccess:true,reasonList:reasonList,accumList:accumList,totalAccum:totalAccum})
            }else{
                res.json({getAccumSuccess:false})
            }
        })
    })
})

module.exports = router;