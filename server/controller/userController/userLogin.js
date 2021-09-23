const {users} = require('../../model/userSchema')

const router = require('express').Router();
const crypto = require('crypto');

router.post('/api/login',(req,res)=>{
    const ID = req.body.ID;
    const Password = req.body.Password;
    if ((ID=='' || Password=='') || (ID=='' && Password=='')){
        res.send({loginSuccess:false})
        // ID, 비밀번호에 아무 값도 없다면 로그인 실패
    }else{
        users.findOne({userID:ID},function(err,notice_dt){
            // document에 동일한 ID가 있는지 findOne으로 확인합니다.
            if (notice_dt!=null){
                // notice_dt!=null 이면, 동일한 ID가 있습니다.
                const dtPW = notice_dt.password;
                const salt=notice_dt.salt;
                crypto.pbkdf2(Password,salt,108326,64,'sha512',(err,key)=>{
                    const hashedPw = key.toString('base64');
                    // 회원가입시, 입력했던 비밀번호는 암호화되어 저장되어있습니다.
                    // 따라서 document의 salt값과 입력한 비밀번호로 해시된 Password를 얻어
                    // document의 password값과 비교합니다.
                    if (dtPW==hashedPw){
                        req.session.userID = ID;
                        res.send({loginSuccess:true});
                        // 비밀번호가 일치하므로, session.userID 값에 현재 로그인한 ID를 넣고
                        // FE에 loginSuccess:true 상태를 전달합니다.
                    }else{
                        res.send({loginSuccess:false});
                    }
                })
            }else{
                res.send({loginSuccess:false});
            }
            
        })
    }
})

module.exports = router;