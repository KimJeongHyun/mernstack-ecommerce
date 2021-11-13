const {users} = require('../../model/userSchema')

const router = require('express').Router();

router.post('/api/getUser',(req,res)=>{
    const ID = req.body.userID;
    users.findOne({userID:ID},function(err,userData){
        if (err) res.send({status:false})
        res.send({status:true,userData:userData})
    })
})

module.exports = router;