const {Review} = require('../../model/ReviewSchema')

const router = require('express').Router();

router.get('/api/getReview/:idx',(req,res)=>{
    Review.find({clothIndex:req.params.idx}).sort({regDate:-1}).exec(function(err,Reviews){
        var ReviewMap={};
        var startIndex = 0;
        var cnt = 1;
        Reviews.forEach(function(Review){
            ReviewMap[cnt] = Review;
            if (cnt==0){
                startIndex = Review.ReviewIndex;
            }
            cnt=cnt+1;
        })
        res.json({getReviewData:true,ReviewMap:ReviewMap,length:Reviews.length,startIndex:startIndex})
    })
})

router.get('/api/getReviewOne/:idx/:_id',(req,res)=>{
    Review.find({clothIndex:req.params.idx, _id:req.params._id}).sort({regDate:-1}).exec(function(err,Reviews){
        var ReviewMap={};
        var cnt = 1;
        Reviews.forEach(function(Review){
            ReviewMap[cnt] = Review;
        })
        res.json({getReviewOneData:true,ReviewMap:ReviewMap})
    })
})

router.get('/api/getReviewAll/',(req,res)=>{
    Review.find({}).sort({regDate:-1}).exec(function(err,Reviews){
        var ReviewMap={};
        var cnt = 1;
        Reviews.forEach(function(Review){
            ReviewMap[cnt] = Review;
            cnt=cnt+1;
        })
        res.json({getReviewAllData:true,ReviewMap:ReviewMap,length:Reviews.length})
    })
})

router.post('/api/getReviewUser/',(req,res)=>{
    const reqData = req.body;
    const userID = reqData.userID;
    Review.find({userID:userID}).sort({regDate:-1}).exec(function(err,Reviews){
        let ReviewMap={};
        let cnt=1;
        Reviews.forEach(function(Review){
            ReviewMap[cnt] = Review;
            cnt=cnt+1
        })
        res.json({getReviewUserData:true,ReviewMap:ReviewMap,length:Reviews.length})
    })

})

module.exports = router;