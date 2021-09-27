const {Review} = require('../../model/ReviewSchema')

const router = require('express').Router();

router.post('/api/postReview/',(req,res)=>{
    const reqData = req.body;
    const userID = reqData.userID;
    const clothIndex = reqData.clothIndex;
    const clothName = reqData.clothName;
    const title = reqData.postTitle;
    const content = reqData.postContent;
    const password = reqData.postPW;

    const postInfo = new Review({
        userID:userID,
        clothIndex:clothIndex,
        clothName:clothName,
        title:title,
        content:content,
        password:password
    })

    postInfo.save().then(function(product){
        console.log('Review posted');
        res.send({postReviewData:true})
    },function rejected(err){
        console.log(err);
        console.log('Review posting err');
        res.send({postReviewData:false})
    })
    

})

module.exports = router;