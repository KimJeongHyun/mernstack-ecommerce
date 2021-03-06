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
    const [couponTTL,setCouponTTL] = useState('');

    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const handleCouponVolume = (value) =>{
        setSelectedCoupon(value);
        setSelectedCouponVolume(value)
        setTotalPrice(totalPrice-value)
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

    const handleCouponTTL = (value)=>{
        setCouponTTL(value);
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
            couponTTL:couponTTL,
            totalPrice:totalPrice
        }
        axios.post('/api/getOrder',body)
        .then(resolve=>{
            if (!resolve.data.status){
                alert('????????? ?????? ?????????????????? ????????????.')
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
        // ????????? ????????? ?????? ???????????? ?????? ???????????? ???????????? ?????????.
    };


    useEffect(() =>{
        if ((loc.colors===undefined || loc.colors.length===0) ||
            (loc.sizes===undefined || loc.sizes.length===0) ||
            (loc.vols===undefined || loc.vols.length===0) ||  
            (loc.totalPrice===undefined || loc.totalPrice===0)){
            alert('????????? ???????????????.')
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
                    <h2>????????? ??????</h2>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>
                    <div className='orderClientInfo'>
                        <p>?????? : {userData.userName}</p>
                        <p>????????? : <input type='text' value={userData.userEmail} /></p>
                        <p>???????????? : <input type='number' value={userData.userPhone}/></p>
                    </div>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                    <div className='addressInfo'>
                        <p>?????? : {userData.userName}</p>
                        <p>???????????? : <input type='number' value={userData.userPhone}/></p>
                        <p>?????? ?????? : <input type='text'/> <button>?????? ??????</button></p>
                        <p>?????? ????????? : <textarea /></p>
                        <p>???????????? : <input type='text' placeholder='?????????????????? ??????????????????.'/></p>
                    </div>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                    <div className='discountApply'>
                        <p>
                            ????????? : <input type='number' id='accumValue' value={inputAccum} onChange={handleAccum} style={{width:'100px', marginRight:'2vw'}}/> 
                            ?????? : {totalAccum} 
                            <button id='applyAccumBtn' style={{marginLeft:'1vw', marginRight:'1vw'}} onClick={applyAccum}>????????? ??????</button>
                            <button id='rollbackAccumBtn' style={{marginLeft:'1vw', marginRight:'1vw', display:'none'}} onClick={rollbackAccum}>?????? ??????</button>
                        </p>
                        <p>?????? ?????? : {selectedCoupon}
                        <div style={{display:'inline-block', marginLeft:'4.3vw'}}>
                            <button id="popupDom" style={{marginRight:'1vw'}} onClick={openPopup}>
                                ?????? ??????
                            </button>
                            <button onClick={rollbackCoupon}>?????? ??????</button>
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
                                    handleCouponTTL={handleCouponTTL}
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
                                    ?????? ??????
                                </td>
                                <td>
                                    ?????????
                                </td>
                                <td>
                                    ??????
                                </td>
                                <td>
                                    ??? ??????
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
                                    {clothMap.sellPrice*(clothMap.discountRate)*0.01} ???
                                </td>
                                <td>
                                    {totalVol} ???
                                </td>
                                <td>
                                    {totalPrice} ???
                                </td>
                            </tr>
                        </table>
                    </div>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                    <div className='total' style={{marginTop:'10px',textAlign:'center'}}>
                        <table>
                            <tr style={{lineHeight:'8vh', backgroundColor:'lightgrey', fontSize:'1.5em'}}> 
                                <td>
                                    ?????? ??????
                                </td>
                                <td>
                                    ?????????
                                </td>
                                <td>
                                    ??????
                                </td>
                                <td>
                                    ?????? ????????????
                                </td>
                            </tr>
                            <tr style={{lineHeight:'5vh', fontSize:'1.3em',backgroundColor:'#EFEFEF'}}>
                                <td>{originPrice}</td>
                                <td>{appliedAccum}</td>
                                <td>{selectedCouponVolume}</td>
                                <td>{totalPrice} ???</td>
                            </tr>
                        </table>
                    </div>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>     
                    <div className='paymentMethod'>
                        paymentMethodArea. ???????????? ??????, ???????????????
                    </div>
                    <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                    <div className='clientPermit'>
                        clientPermitArea. ????????? ?????? ????????????.
                    </div>
                    <button className='SubmitBtn' style={{float:'right'}} onClick={orderRequest}><a>????????????</a></button>
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