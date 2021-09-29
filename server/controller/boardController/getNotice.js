const {Notice} = require('../../model/NoticeSchema')

const router = require('express').Router();

router.get('/api/getNotice',(req,res)=>{
    Notice.find({}).sort({regDate:-1}).exec(function(err,Notices){
        var NoticeMap={};
        var cnt = 1;
        Notices.forEach(function(Notice){
            NoticeMap[cnt] = Notice;
            cnt=cnt+1;
        })
        res.json({getNoticeData:true,NoticeMap:NoticeMap,length:Notices.length})
    })
})

router.get('/api/getNoticeOne/:idx/:_id',(req,res)=>{
    Notice.find({NoticeIndex:req.params.idx, _id:req.params._id}).sort({regDate:-1}).exec(function(err,Notices){
        var NoticeMap={};
        var cnt = 1;
        Notices.forEach(function(Notice){
            NoticeMap[cnt] = Notice;
        })
        res.json({getNoticeOneData:true,NoticeMap:NoticeMap})
    })
})

module.exports = router;