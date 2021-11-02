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

router.get('/api/getCoupon',(req,res)=>{
    const ID = req.session.userID;
    users.findOne({userID:ID},function(err,user){
        coupons.find({userID:{$in:user._id}},function(err,couponArr){
            if (couponArr.length>0){
                const reasonList = [];
                const couponVolume = [];
                const ttlList = [];
                for (let i=0; i<couponArr.length; i++){
                    reasonList.push(couponArr[i].reason)
                    couponVolume.push(couponArr[i].couponVolume);
                    ttlList.push(couponArr[i].regDate);
                }
                res.json({getCouponSuccess:true, reasonList:reasonList, couponVolume:couponVolume, ttlList:ttlList})
            }else{
                res.json({getCouponSuccess:false})
            }
            
        })
    })
})

module.exports = router;