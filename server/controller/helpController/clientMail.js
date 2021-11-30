const nodemailer = require('nodemailer')
const fs = require('fs')
const config = require('../../config/config.json');
const router = require('express').Router();

router.post('/api/sendMail/',(req,res)=>{
    const reqData =req.body;
    const userID = reqData.userID
    const email = reqData.email
    const subject = reqData.subject;
    const text = reqData.text;
    const category = reqData.category;
    const attachments = reqData.attachments;
    const attachmentsArr = attachments.map((file)=>{
        return {path:file};
    })


    let transporter = nodemailer.createTransport({
        // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
        service: 'gmail',
        // host를 gmail로 설정
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          // Gmail 주소 입력, 'testmail@gmail.com'
          user: config.gU,
          // Gmail 패스워드 입력
          pass: config.gP
        },
    });

    const worker = async () =>{
        let info = await transporter.sendMail({
            // 보내는 곳의 이름과, 메일 주소를 입력
            from: `"Client's request" <${email}>`,
            // 받는 곳의 메일 주소를 입력
            to: 'ptr1129@naver.com',
            // 보내는 메일의 제목을 입력
            subject: `[${category}][${userID}][${email}] ${subject}`,
            // 보내는 메일의 내용을 입력
            // text: 일반 text로 작성된 내용
            // html: html로 작성된 내용 html: `<b>${generatedAuthNumber}</b>`,
            text: text,
            attachments:attachmentsArr
        });
        res.status(200).json({
            sendMailSuccess:true,
            code:200,
            message:'Send Mail'
        })
    }

    worker();
})
  
module.exports = router;