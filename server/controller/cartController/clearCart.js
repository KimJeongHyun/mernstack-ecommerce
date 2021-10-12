const {users} = require('../../model/userSchema')
const router = require('express').Router();

router.post('/api/clearCart/',(req,res)=>{
    const reqData = req.body;
    const userID = reqData.userID;
    const deleteList = reqData.deleteList;
    deleteList.forEach((item)=>{
        users.updateOne({userID:userID},
         {$pull:{
             CartItem:{
                 clothIndex:item
             }
         }},function(err,result){
             if (err) console.log(err);  
         })
    })
    res.json({clearCartSuccess:true})
})

module.exports = router;