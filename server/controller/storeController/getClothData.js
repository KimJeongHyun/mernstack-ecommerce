const {cloth} = require('../../model/clothSchema')

const router = require('express').Router();

const database = require('../../database')();

database.db_open();

router.get('/api/getClothes',(req,res)=>{
    cloth.find({}, function(err,clothes){
        var clothesMap={};
        var startIndex = 0;
        var cnt = 0;
        clothes.forEach(function(cloth){
            clothesMap[cloth.clothIndex] = cloth;
            if (cnt==0){
                startIndex = cloth.clothIndex;
            }
            cnt=cnt+1;
        })
        res.json({getClothSuccess:true,clothesMap:clothesMap,length:clothes.length,startIndex:startIndex})
    })
})

module.exports = router;