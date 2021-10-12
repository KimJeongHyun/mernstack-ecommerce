const {Notice} = require('../../model/NoticeSchema')
const router = require('express').Router();

router.post('/api/clearNotice/',(req,res)=>{
    const reqData = req.body;
    const deleteList = reqData.deleteList;
    deleteList.forEach((item)=>{
        Notice.deleteOne({NoticeIndex:item},
         function(err,result){
             if (err) console.log(err);
         })
    })

    res.json({clearNoticeSuccess:true})
})

module.exports = router;