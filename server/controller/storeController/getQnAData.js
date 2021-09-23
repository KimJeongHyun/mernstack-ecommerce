const {QnA} = require('../../model/QnASchema')

const router = require('express').Router();

router.get('/api/getQnA/:idx',(req,res)=>{
    QnA.find({clothIndex:req.params.idx}, function(err,QnAs){
        var QnAMap={};
        var startIndex = 0;
        var cnt = 0;
        QnAs.forEach(function(QnA){
            QnAMap[QnA.QnAIndex] = QnA;
            if (cnt==0){
                startIndex = QnA.QnAIndex;
            }
            cnt=cnt+1;
        })
        res.json({getQnAData:true,QnAMap:QnAMap,length:QnAs.length,startIndex:startIndex})
    })
})

module.exports = router;