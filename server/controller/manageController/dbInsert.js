const {cloth} = require('../../model/clothSchema')

const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"client/public/images/");
    },
    filename(req,file,cb){
        cb(null,`${file.originalname}`)
    }
})

const upload = multer({storage:storage})

router.post('/api/postProduct',upload.single('img'),(req,res)=>{
    const reqData = req.body;
    const clothImgPath = 'images/'+req.file.originalname
    const clothName = reqData.clothName;
    const deliverySol = reqData.deliverySol;
    const exportRange = reqData.exportRange;
    const sellPrice = reqData.sellPrice;
    const discountRate = reqData.discountRate;


    const postInfo = new cloth({
        clothImgPath:clothImgPath,
        clothName:clothName,
        sellNum:0,
        reviewNum:0,
        deliverySol:deliverySol,
        exportRange:exportRange,
        sellPrice:sellPrice,
        discountRate:discountRate
    })

    postInfo.save().then(function(product){
        console.log('product posted');
        res.send({postSuccess:true})
    },function rejected(err){
        console.log(err);
        console.log('product posting err');
        res.send({postSuccess:false})
    })


})

module.exports = router;