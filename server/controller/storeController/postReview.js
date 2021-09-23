const {Review} = require('../../model/ReviewSchema')

const router = require('express').Router();

router.post('/api/postReview/:idx',(req,res)=>{
    console.log(req.body);
})

module.exports = router;