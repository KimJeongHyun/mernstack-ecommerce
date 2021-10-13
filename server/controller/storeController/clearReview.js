const {Review} = require('../../model/ReviewSchema')
const router = require('express').Router();

router.post('/api/clearReview/',(req,res)=>{
    const reqData = req.body;
    const deleteList = reqData.deleteList;
    deleteList.forEach((item)=>{
        Review.deleteOne({ReviewIndex:item},
         function(err,result){
             if (err) console.log(err);
         })
    })

    res.json({clearReviewSuccess:true})
})

module.exports = router;