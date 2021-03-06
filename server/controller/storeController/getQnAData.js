const {QnA} = require('../../model/QnASchema')

const router = require('express').Router();

router.get('/api/getQnA/:idx',(req,res)=>{
    QnA.find({clothIndex:req.params.idx}).sort({regDate:-1}).exec(function(err,QnAs){
        var QnAMap={};
        var startIndex = 0;
        var cnt = 1;
        QnAs.forEach(function(QnA){
            QnAMap[cnt] = QnA;
            if (cnt==0){
                startIndex = cnt;
            }
            cnt=cnt+1;
        })
        res.json({getQnAData:true,QnAMap:QnAMap,length:QnAs.length,startIndex:cnt})
    })
})

router.get('/api/getQnAOne/:idx/:_id',(req,res)=>{
    QnA.find({clothIndex:req.params.idx, _id:req.params._id}).sort({regDate:-1}).exec(function(err,QnAs){
        var QnAMap={};
        var cnt = 1;
        QnAs.forEach(function(QnA){
            QnAMap[cnt] = QnA;
        })
        res.json({getQnAOneData:true,QnAMap:QnAMap})
    })
})

router.get('/api/getQnAAll/',(req,res)=>{
    QnA.find({}).sort({regDate:-1}).exec(function(err,QnAs){
        var QnAMap={};
        var cnt = 1;
        QnAs.forEach(function(QnA){
            QnAMap[cnt] = QnA;
            cnt=cnt+1
        })
        res.json({getQnAAllData:true,QnAMap:QnAMap,length:QnAs.length})
    })
})

router.post('/api/getQnAUser/',(req,res)=>{
    const reqData = req.body;
    const userID = reqData.userID;
    QnA.find({userID:userID}).sort({regDate:-1}).exec(function(err,QnAs){
        let QnAMap={};
        let cnt=1;
        QnAs.forEach(function(QnA){
            QnAMap[cnt] = QnA;
            cnt=cnt+1
        })
        res.json({getQnAUserData:true,QnAMap:QnAMap,length:QnAs.length})
    })

})

module.exports = router;