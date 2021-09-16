const {cloth} = require('../../model/clothSchema')

const router = require('express').Router();

const database = require('../../database')();

database.db_open();

router.get('/api/getDetailData/:idx',(req,res)=>{
    const clothID = req.params.idx;
    
    cloth.findOne({clothIndex:clothID}, function(err,clothRes){
        res.send({getDetailData:true, clothRes:clothRes})
    })
})

module.exports = router;