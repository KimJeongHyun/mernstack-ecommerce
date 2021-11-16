const router = require('express').Router();
const encryptSha256 = require('../../libs/encrypt')
const config = require('../../config/config.json')

router.post('/api/getOrder',(req,res)=>{
    const reqData = req.body;
    const goodName = reqData.clothName;
    const buyertel = reqData.userPhone;
    const buyerEmail = reqData.userEmail;

    const userID = req.session.userID;
    const accum = reqData.accum;
    const couponID = reqData.couponID;
    const couponVolume = reqData.couponVolume;
    const price = reqData.totalPrice;

    const host = config.host;

    const timestamp = new Date().getTime();
    const orderId = 'test'
    
    const str = goodName+'_'+buyertel+'_'+buyerEmail+'_'+accum+'_'+couponID+'_'+couponVolume+'_'+price

    const dataset = {
        version: '1.0',
        gopaymethod: 'VBank',
        mid: 'INIpayTest',
        signature: encryptSha256(`oid=${str}&price=${price}&timestamp=${timestamp}`),
        mKey: encryptSha256('SU5JTElURV9UUklQTEVERVNfS0VZU1RS'), // 개발용, 배포용에서는 발급된 key를 사용
        price:price,
        oid: str,
        timestamp:timestamp,
        currency: 'WON',
        goodname: goodName,
        buyername: userID,
        buyertel: buyertel,
        buyeremail: buyerEmail,
        returnUrl: host+`/api/v1/inicis/pay/after`,
        payViewType: 'popup',
        popupUrl: host + `/api/v1/inicis/popup/open/${str}`,
        closeUrl: '',
    }
    return res.send({ status: 'success', data: dataset });
})

const openInicisModule = (req,res) =>{
    const {orderParam} = req.params;
    const splitParam = orderParam.split('_');
    const orderId='TEST'
    
    const goodname = splitParam[0];
    const buyername = req.session.userID;
    const buyertel = splitParam[1];
    const buyeremail = splitParam[2];
    const accum = splitParam[3];
    const couponID = splitParam[4];
    const couponVolume = splitParam[5];
    const price = parseInt(splitParam[6])


    const timestamp = new Date().getTime();
    const host = config.host;
    
    const dataset = {
        version: '1.0',
        gopaymethod: 'VBank',
        mid: 'INIpayTest',
        signature: encryptSha256(`oid=${orderId}&price=${price}&timestamp=${timestamp}`),
        mKey: encryptSha256('SU5JTElURV9UUklQTEVERVNfS0VZU1RS'), // 개발용, 배포용에서는 발급된 key를 사용
        price:price,
        oid: orderId,
        timestamp:timestamp,
        currency: 'WON',
        goodname: goodname,
        buyername: buyername,
        buyertel: buyertel,
        buyeremail: buyeremail,
        returnUrl: host+`/api/v1/inicis/pay/after`,
        payViewType: 'popup',
        popupUrl: host + `/api/v1/inicis/popup/open/${orderId}`,
        closeUrl: '',
    }
    res.render('w_inicis', { ...dataset });
}

router.get('/api/v1/inicis/popup/open/:orderParam',(req,res)=>{
    return openInicisModule(req,res);
})

const onSavePaymentInfo = async (req, res) => {
    const { authUrl, authToken, orderNumber, mid, charset, resultCode } = req.body;
    console.log(resultCode);
    // 0000이면 결제성공
    if (resultCode === '0000') {
        // 결제 관련 데이터 처리
        return res.redirect('http://localhost:3000' + `/payment/close`);
    } else {
        // 결제 실패 처리
        return res.redirect('http://localhost:3000' + `/payment/close`);
    }
    
};

router.post('/api/v1/inicis/pay/after',(req,res)=>{
    return onSavePaymentInfo(req,res);
})

module.exports = router;