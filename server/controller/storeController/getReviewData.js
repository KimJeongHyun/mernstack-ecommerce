const {Review} = require('../../model/ReviewSchema')

const router = require('express').Router();

router.get('/api/getReview/:idx',(req,res)=>{
    Review.find({clothIndex:req.params.idx}, function(err,Reviews){
        var ReviewMap={};
        var startIndex = 0;
        var cnt = 1;
        Reviews.forEach(function(Review){
            ReviewMap[Review.ReviewIndex] = Review;
            if (cnt==0){
                startIndex = Review.ReviewIndex;
            }
            cnt=cnt+1;
        })
        res.json({getReviewData:true,ReviewMap:ReviewMap,length:Reviews.length,startIndex:startIndex})
    })
})

router.get('/api/getReviewOne/:idx/:_id',(req,res)=>{
    Review.find({clothIndex:req.params.idx, _id:req.params._id}, function(err,Reviews){
        var ReviewMap={};
        var cnt = 1;
        Reviews.forEach(function(Review){
            ReviewMap[cnt] = Review;
        })
        res.json({getReviewOneData:true,ReviewMap:ReviewMap})
    })
})

module.exports = router;