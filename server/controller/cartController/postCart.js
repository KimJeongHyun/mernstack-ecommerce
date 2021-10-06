const {users} = require('../../model/userSchema')
const router = require('express').Router();

router.post('/api/postCart/',(req,res)=>{
    const reqData = req.body;
    const productIndex = reqData.productIndex;
    const userID = reqData.userID;
    users.findOne({userID:userID},function(err,user){
       const userCart = user.CartItem;
       if (userCart.length==0){
           users.updateOne({userID:userID},
            {$push:{
                CartItem:{
                    clothIndex:productIndex,
                    quantity:1
                }
            }},function(err,result){
                if (err) console.log(err);
            })
       }else{
           let flag=0
           userCart.some((item)=>{
               if (item.clothIndex==productIndex){
                   const quantity = item.quantity;
                   users.updateOne({userID:userID, CartItem:{$elemMatch:{clothIndex:productIndex}}},
                    {
                        'CartItem.$.quantity':quantity+1
                    }, function(err,result){
                        if (err) console.log(err);
                        res.json({postCartSuccess:true})
                    })
                    flag=1
                    return (item.clothIndex==productIndex)
               }
           })
           if (flag==0){
                users.updateOne({userID:userID},
                {$push:{
                    CartItem:{
                        clothIndex:productIndex,
                        quantity:1
                    }
                }},function(err,result){
                    if (err) console.log(err);
                    res.json({postCartSuccess:true})
                })
           }

       }
    })
    
})

module.exports = router;