const {QnA} = require('../../model/QnASchema')
const router = require('express').Router();

router.post('/api/clearQnA/',(req,res)=>{
    const reqData = req.body;
    const deleteList = reqData.deleteList;
    deleteList.forEach((item)=>{
        QnA.deleteOne({QnAIndex:item},
         function(err,result){
             if (err) console.log(err);
         })
    })

    res.json({clearQnASuccess:true})
})

module.exports = router;