const router = require('express').Router();

router.get('/api/logout',(req,res)=>{
    req.session.destroy();
    res.send({logoutSuccess:true})
})

module.exports = router;