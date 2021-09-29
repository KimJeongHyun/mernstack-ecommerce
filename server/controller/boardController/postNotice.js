const {Notice} = require('../../model/NoticeSchema')

const router = require('express').Router();

router.post('/api/postNotice/',(req,res)=>{
    const reqData = req.body;
    const userID = reqData.userID;
    const title = reqData.postTitle;
    const content = reqData.postContent;

    const postInfo = new Notice({
        userID:userID,
        title:title,
        content:content
    })

    postInfo.save().then(function(product){
        console.log('Notice posted');
        res.send({postNoticeData:true})
    },function rejected(err){
        console.log(err);
        console.log('Notice posting err');
        res.send({postNoticeData:false})
    })

    
})

module.exports = router;