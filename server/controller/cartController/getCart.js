
const {users} = require('../../model/userSchema')
const router = require('express').Router();

router.post('/api/getCart',(req,res)=>{
    const reqData = req.body;
    const userID = reqData.userID;
    users.find({userID:userID},function(err,user){
        let UserMap={};
        let cnt = 1;
        user.forEach(function(user){
            UserMap[cnt] = user;
            cnt=cnt+1;
        })
        res.json({getCartData:true,CartMap:UserMap[1].CartItem,length:UserMap[1].CartItem.length})
    })
})

module.exports = router;