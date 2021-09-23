const {cloth} = require('../../model/clothSchema')

const router = require('express').Router();

router.get('/api/getDetailData/:idx',(req,res)=>{
    const clothID = req.params.idx;
    
    cloth.findOne({clothIndex:clothID}, function(err,clothRes){
        res.send({getDetailData:true, clothRes:clothRes})
    })
})

module.exports = router;