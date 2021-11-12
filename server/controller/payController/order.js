const router = require('express').Router();
const encryptSha256 = require('../../libs/encrypt')
const config = require('../../config/config.json')

router.post('/api/getOrder',(req,res)=>{
    const reqData = req.body;
    
    const colors = reqData.colors;
    const sizes = reqData.sizes;
    const vols = reqData.vols;
    const price = reqData.price;

    const host = config.host;

    if (colors.length===0 || sizes.length===0 || vols.length===0 || price===0){
        res.send({status:false})
    }else{
        const timestamp = new Date().getTime();
        const orderId = 'test'

        const dataset = {
            version: '1.0',
            gopaymethod: 'VBank',
            mid: 'test',
            signature: encryptSha256(`oid=${orderId}&price=${price}&timestamp=${timestamp}`),
            mKey: encryptSha256('SU5JTElURV9UUklQTEVERVNfS0VZU1RS'), // 개발용, 배포용에서는 발급된 key를 사용
            price,
            oid: orderId,
            timestamp,
            currency: 'WON',
            goodname: 'Sample',
            buyername: '홍길동',
            buyertel: '01012341234',
            buyeremail: 'sample@sample.com.kr',
            returnUrl: host+`/api/v1/inicis/pay/after`,
            payViewType: 'popup',
            popupUrl: host + `/api/v1/inicis/popup/open/${orderId}`,
            closeUrl: '',
        }
        return res.send({ status: 'success', data: dataset });
    }
})

const openInicisModule = (req,res) =>{
    console.log('hi');
    const {orderId} = req.params;
    console.log(orderId);
    const price=100;
    const timestamp = new Date().getTime();
    const host = config.host;
    
    const dataset = {
        version: '1.0',
        gopaymethod: 'VBank',
        mid: 'test',
        signature: encryptSha256(`oid=${orderId}&price=${price}&timestamp=${timestamp}`),
        mKey: encryptSha256('SU5JTElURV9UUklQTEVERVNfS0VZU1RS'), // 개발용, 배포용에서는 발급된 key를 사용
        price,
        oid: orderId,
        timestamp,
        currency: 'WON',
        goodname: 'Sample',
        buyername: '홍길동',
        buyertel: '01012341234',
        buyeremail: 'sample@sample.com.kr',
        returnUrl: host+`/api/v1/inicis/pay/after`,
        payViewType: 'popup',
        popupUrl: host + `/api/v1/inicis/popup/open/${orderId}`,
        closeUrl: '',
    }
    res.render('w_inicis', { ...dataset });
}

router.get('/api/v1/inicis/popup/open/:orderId',(req,res)=>{
    console.log('router');
    return openInicisModule(req,res);
})

const onSavePaymentInfo = async (req, res) => {
    console.log('hi!!!');
    const { authUrl, authToken, orderNumber, mid, charset, resultCode } = req.body;

    // 0000이면 결제성공
    if (resultCode === '0000') {
        // 결제 관련 데이터 처리
        return res.redirect(getClientDomain() + `/payment/close`);
    } else {
        // 결제 실패 처리
        return res.redirect(getClientDomain() + `/payment/close`);
    }
};

router.get('/api/v1/inicis/pay/after',(req,res)=>{
    return onSavePaymentInfo(req,res);
})

module.exports = router;