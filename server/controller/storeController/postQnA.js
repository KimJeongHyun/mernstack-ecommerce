const {QnA} = require('../../model/QnASchema')

const router = require('express').Router();

router.post('/api/postQnA/',(req,res)=>{
    const reqData = req.body;
    const userID = reqData.userID;
    const clothIndex = reqData.clothIndex;
    const title = reqData.postTitle;
    const content = reqData.postContent;
    const password = reqData.postPW;

    const postInfo = new QnA({
        userID:userID,
        clothIndex:clothIndex,
        title:title,
        content:content,
        password:password
    })

    postInfo.save().then(function(product){
        console.log('QnA posted');
        res.send({postQnAData:true})
    },function rejected(err){
        console.log(err);
        console.log('QnA posting err');
        res.send({postQnAData:false})
    })

    
})

module.exports = router;