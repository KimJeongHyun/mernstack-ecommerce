import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { NavSideBar } from '../NavBar/NavSideBar'
import '../../css/style.css'
import '../../css/popupCSS.css'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import axios from 'axios'
import PopupDom from './PopupDom'
import PopupContent from './PopupContent'


function ProductOrder(props){

    let inicisFormStatus = null;

    const [orderNumber,setOrderNumber] = useState();
    const [orderId,setOrderId] = useState();


    const loc = useLocation();
    const [clothMap,setClothMap] = useState({});
    const [colorList,setColorList] = useState([]);
    const [sizeList,setSizeList] = useState([]);
    const [volList,setVolList] = useState([])
    const [totalVol,setTotalVol] = useState(0);

    const [totalPrice,setTotalPrice] = useState(0);
    const [originPrice,setOriginPrice] = useState(0);
    
    const [userData, setUserData] = useState([]);
    
    const [totalAccum, setTotalAccum] = useState(0);
    const [originAccum, setOriginAccum] = useState(0);
    const [inputAccum, setInputAccum] = useState(0);
    const [appliedAccum, setAppliedAccum] = useState(0);

    const [selectedCoupon, setSelectedCoupon] = useState(0);
    const [selectedCouponVolume, setSelectedCouponVolume] = useState(0);

    const [reasonList,setReasonList] = useState([]);
    const [couponVolume,setCouponVolume] = useState([]);
    const [createdAtList, setCreatedAtList] = useState([]);
    const [expiredAtList, setExpiredAtList] = useState([]);
    const [couponIDList, setCouponIDList] = useState([]);
    const [couponID,setCouponID] = useState('');
    const [couponName,setCouponName] = useState('');

    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const handleCouponVolume = (value) =>{
        setSelectedCoupon(value);
        setSelectedCouponVolume(value.split(' ')[0])
        setTotalPrice(totalPrice-value.split(' ')[0])
    }

    const handleCouponID = (value) =>{
        setCouponID(value);
        console.log(value);
    }

    const handleAccum = (event) =>{
        event.preventDefault();
        setInputAccum(event.target.value);
    }

    const handleCouponPrice = (value)=>{
        setTotalPrice(totalPrice-parseInt(value));
    }

    const handleCouponName = (value)=>{
        setCouponName(value);
    }

    const applyAccum = (event) =>{
        event.preventDefault();
        if (totalAccum-inputAccum>=0){
            setTotalAccum(totalAccum-inputAccum);
            setTotalPrice(totalPrice-inputAccum);
            setAppliedAccum(inputAccum);
            document.getElementById('accumValue').setAttribute('readOnly',true)
            document.getElementById('applyAccumBtn').style.display='none'
            document.getElementById('rollbackAccumBtn').style.display='inline-block'
        }
    }

    const rollbackAccum = (event) =>{
        event.preventDefault();
        setTotalAccum(originAccum);
        setTotalPrice(totalPrice+parseInt(inputAccum));
        setInputAccum(0);
        document.getElementById('accumValue').removeAttribute('readOnly');
        document.getElementById('rollbackAccumBtn').style.display='none'
        document.getElementById('applyAccumBtn').style.display='inline-block'
    }

    const rollbackCoupon = (event) =>{
        event.preventDefault();
        setTotalPrice(totalPrice+parseInt(selectedCouponVolume));
        setCouponID('');
        setSelectedCoupon('');
        setSelectedCouponVolume(0);

    }

    const openPopup = (event) =>{
        event.preventDefault();
        setIsOpenPopup(true);
        const blindDiv = document.getElementById('blindDiv')
        blindDiv.style.width = document.body.scrollWidth+'px';
        blindDiv.style.height = document.body.scrollHeight+'px';
        blindDiv.style.filter = "alpha(opacity=30)"
        blindDiv.style.opacity="0.3";
        blindDiv.style.display='block'
    }

    const closePopup = (event) =>{
        event.preventDefault();
        setIsOpenPopup(false);
        document.getElementById('blindDiv').classList.remove('blind');
        const blindDiv = document.getElementById('blindDiv')
        blindDiv.style.display='none'
    }

    const orderRequest = (event) =>{
        event.preventDefault();
        setOrderNumber(clothMap.clothName+'_'+userData.userPhone+'_'+userData.userEmail+'_'+inputAccum+'_'+couponID+'_'+selectedCouponVolume+'_'+totalPrice)
        setOrderId(clothMap.clothName+'_'+userData.userPhone+'_'+userData.userEmail+'_'+inputAccum+'_'+couponID+'_'+selectedCouponVolume+'_'+totalPrice);
        let body = {
            clothName:clothMap.clothName,
            userPhone:userData.userPhone,
            userEmail:userData.userEmail,
            accum:inputAccum,
            couponID:couponID,
            couponName:couponName,
            couponVolume:selectedCouponVolume,
            totalPrice:totalPrice
        }
        axios.post('/api/getOrder',body)
        .then(resolve=>{
            if (!resolve.data.status){
                alert('옵션을 모두 선택해주시기 바랍니다.')
            }else{
                const { data: info } = resolve; 
                const { status, data } = info;
                const form = document.createElement('form');
                form.method = 'POST';
                form.acceptCharset = 'UTF-8';
                form.hidden = true;
                form.id = 'pay_form';

                for (let o in data) {
                    const input = document.createElement('input');
                    input.name = o;
                    input.value = data[o];
                    input.hidden = true;
                    form.appendChild(input);
                }
                document.querySelector('#shop-page').appendChild(form);
                window.INIStdPay.pay('pay_form');
                inicisFormStatus = setInterval(checkInicisFormStatus, 1000);     
            }
            
        })
    }

    const checkInicisFormStatus = () => {
        const node = document.querySelector('.inipay_modal-backdrop');
        if (node) return true;
        else {
            const form_node = document.querySelector('#pay_form');
            if (form_node) form_node.remove();

            fetchOrderInfo();
            return false;
        }
    };

    const fetchOrderInfo = () => {
        clearInterval(inicisFormStatus);
        if (!orderNumber && !orderId) console.log('payment failed')//return props.history.push('/payment/failed');
        else console.log('payment success')//props.history.push(`/payment/result/${orderNumber || orderId}`);
        // 여기서 상태에 따라 주문완료 또는 주문실패 페이지로 라우팅.
    };


    useEffect(() =>{
        if ((loc.colors===undefined || loc.colors.length===0) ||
            (loc.sizes===undefined || loc.sizes.length===0) ||
            (loc.vols===undefined || loc.vols.length===0) ||  
            (loc.totalPrice===undefined || loc.totalPrice===0)){
            alert('잘못된 접근입니다.')
            window.history.back();
        }else{
            setClothMap(loc.clothMap);
            setColorList(loc.colors);
            setSizeList(loc.sizes);
            setVolList(loc.vols);
            setTotalVol((current)=>{
                let sum = 0;
                for (let i=0; i<loc.vols.length; i++){
                    sum+=loc.vols[i];
                }
                return sum;
            })
            setTotalPrice(loc.totalPrice);
            setOriginPrice(loc.totalPrice);
            axios.get('/api/getSession')
            .then(response=>{
                const userID = response.data.ID;
                let body = {
                    userID:userID
                }
                axios.post('/api/getUser',body)
                .then(response=>{
                    const resData = response.data.userData;
                    setUserData(resData);

                })

                axios.get('/api/getAccumLog')
                .then(response=>{
                    setTotalAccum(response.data.totalAccum);
                    setOriginAccum(response.data.totalAccum);
                })

            })

            axios.get('/api/getCoupon')
            .then(response=>{
                if (response.data.getCouponSuccess){
                    setReasonList(response.data.reasonList);
                    setCouponVolume(response.data.couponVolume);
                    setCreatedAtList(response.data.createdAtList);
                    setExpiredAtList(response.data.expiredAtList);
                    setCouponIDList(response.data.couponIDList);
                }
            })
        }
    },[])


    
    return(
        <div id='container'>
            <div id='blindDiv'>

            </div>
            <NavSideBar/>
            <NavBar/>
            <div className="uxArea">
                <div className="contentContainer">
                <div className='orderArea'>
                    <h2>주문자 정보</h2>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>
                    <div className='orderClientInfo'>
                        <p>이름 : {userData.userName}</p>
                        <p>이메일 : <input type='text' value={userData.userEmail} /></p>
                        <p>전화번호 : <input type='number' value={userData.userPhone}/></p>
                    </div>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                    <div className='addressInfo'>
                        <p>이름 : {userData.userName}</p>
                        <p>전화번호 : <input type='number' value={userData.userPhone}/></p>
                        <p>배송 주소 : <input type='text'/> <button>주소 찾기</button></p>
                        <p>주문 메시지 : <textarea /></p>
                        <p>입금자명 : <input type='text' placeholder='무통장입금시 기입바랍니다.'/></p>
                    </div>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                    <div className='discountApply'>
                        <p>
                            적립금 : <input type='number' id='accumValue' value={inputAccum} onChange={handleAccum} style={{width:'100px', marginRight:'2vw'}}/> 
                            총액 : {totalAccum} 
                            <button id='applyAccumBtn' style={{marginLeft:'1vw', marginRight:'1vw'}} onClick={applyAccum}>적립금 적용</button>
                            <button id='rollbackAccumBtn' style={{marginLeft:'1vw', marginRight:'1vw', display:'none'}} onClick={rollbackAccum}>적용 취소</button>
                        </p>
                        <p>쿠폰 적용 : {selectedCoupon}
                        <div style={{display:'inline-block', marginLeft:'4.3vw'}}>
                            <button id="popupDom" style={{marginRight:'1vw'}} onClick={openPopup}>
                                쿠폰 확인
                            </button>
                            <button onClick={rollbackCoupon}>적용 취소</button>
                            {isOpenPopup && 
                            <PopupDom>
                                <PopupContent onClose={closePopup}
                                    reasonList={reasonList}
                                    couponVolume={couponVolume}
                                    createdAtList={createdAtList}
                                    expiredAtList={expiredAtList}
                                    couponIDList={couponIDList}
                                    handleCouponVolume={handleCouponVolume}
                                    handleCouponID={handleCouponID}
                                    handleCouponPrice={handleCouponPrice}
                                    handleCouponName={handleCouponName}
                                />    
                            </PopupDom>}
                        </div>
                        </p>
                        
                    </div>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                    <div style={{marginTop:'10px',textAlign:'center'}}>
                        <table>
                            <tr style={{lineHeight:'5vh', backgroundColor:'lightgrey', fontSize:'1.2em'}}>
                                <td colSpan='2' style={{width:'50%'}}>
                                    상품 정보
                                </td>
                                <td>
                                    적립금
                                </td>
                                <td>
                                    수량
                                </td>
                                <td>
                                    총 금액
                                </td>
                            </tr>
                            <tr style={{backgroundColor:'#EFEFEF'}}>
                                <td>
                                    <img src={clothMap.clothImgPath}/>
                                </td>
                                <td>
                                    {clothMap.clothName}
                                </td>
                                <td>
                                    {clothMap.sellPrice*(clothMap.discountRate)*0.01} 원
                                </td>
                                <td>
                                    {totalVol} 개
                                </td>
                                <td>
                                    {totalPrice} 원
                                </td>
                            </tr>
                        </table>
                    </div>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                    <div className='total' style={{marginTop:'10px',textAlign:'center'}}>
                        <table>
                            <tr style={{lineHeight:'8vh', backgroundColor:'lightgrey', fontSize:'1.5em'}}> 
                                <td>
                                    전체 금액
                                </td>
                                <td>
                                    적립금
                                </td>
                                <td>
                                    쿠폰
                                </td>
                                <td>
                                    최종 결제금액
                                </td>
                            </tr>
                            <tr style={{lineHeight:'5vh', fontSize:'1.3em',backgroundColor:'#EFEFEF'}}>
                                <td>{originPrice}</td>
                                <td>{appliedAccum}</td>
                                <td>{selectedCouponVolume}</td>
                                <td>{totalPrice} 원</td>
                            </tr>
                        </table>
                    </div>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>     
                    <div className='paymentMethod'>
                        paymentMethodArea. 결제방법 확인, 현금영수증
                    </div>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                    <div className='clientPermit'>
                        clientPermitArea. 주문자 동의 체크박스.
                    </div>
                    <button className='SubmitBtn' style={{float:'right'}} onClick={orderRequest}><a>결제하기</a></button>
                </div>
            </div>
        </div>
        <div id='shop-page'>
                
        </div>
        <Footer/>
    </div>
        
    )
}

export default ProductOrder