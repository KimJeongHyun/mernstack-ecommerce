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
                const createdAtList = [];
                const expiredAtList = [];
                const couponIDList = [];
                for (let i=0; i<couponArr.length; i++){
                    reasonList.push(couponArr[i].reason)
                    couponVolume.push(couponArr[i].couponVolume)
                    createdAtList.push(couponArr[i].createdAt)
                    expiredAtList.push(couponArr[i].expiredAt)
                    couponIDList.push(couponArr[i]._id)
                }
                res.json({getCouponSuccess:true, reasonList:reasonList, couponVolume:couponVolume, createdAtList:createdAtList, expiredAtList:expiredAtList, couponIDList:couponIDList})
            }else{
                res.json({getCouponSuccess:false})
            }
            
        })
    })
})

module.exports = router;