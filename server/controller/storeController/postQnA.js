const {QnA} = require('../../model/QnASchema')

const router = require('express').Router();

router.post('/api/postQnA/:idx',(req,res)=>{
    console.log(req.body);
})

module.exports = router;