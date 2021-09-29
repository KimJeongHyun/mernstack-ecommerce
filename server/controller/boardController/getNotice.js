const {Notice} = require('../../model/NoticeSchema')

const router = require('express').Router();

router.get('/api/getNoticees',(req,res)=>{
    Notice.find({}, function(err,Noticees){
        var NoticeesMap={};
        var startIndex = 0;
        var cnt = 0;
        Noticees.forEach(function(Notice){
            NoticeesMap[Notice.NoticeIndex] = Notice;
            if (cnt==0){
                startIndex = Notice.NoticeIndex;
            }
            cnt=cnt+1;
        })
        res.json({getNoticeSuccess:true,NoticeesMap:NoticeesMap,length:Noticees.length,startIndex:startIndex})
    })
})

module.exports = router;