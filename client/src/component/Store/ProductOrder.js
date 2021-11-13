import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { NavSideBar } from '../NavBar/NavSideBar'
import '../../css/style.css'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import axios from 'axios'


function ProductOrder(props){
    const loc = useLocation();
    const [clothMap,setClothMap] = useState({});
    const [colorList,setColorList] = useState([]);
    const [sizeList,setSizeList] = useState([]);
    const [volList,setVolList] = useState([])
    const [totalVol,setTotalVol] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [userData, setUserData] = useState([]);
    const [totalAccum, setTotalAccum] = useState([]);

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
                })

            })
        }
    },[])
    console.log(userData.userName);
    return(
        <div id='container'>
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
                            <p>적립금 : {totalAccum}<button style={{marginLeft:'1vw'}}>적립금 적용</button></p>
                            <p>쿠폰 확인</p>
                            
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
                        <hr style={{marginTop:'2vh',border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                        <div className='paymentMethod'>
                            paymentMethodArea. 결제방법 확인, 현금영수증
                        </div>
                        <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                        <div className='clientPermit'>
                            clientPermitArea. 주문자 동의 체크박스.
                        </div>
                        <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                        <div className='total'>
                            총 금액 : {totalPrice} 원
                        </div>
                               
                        <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                        
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        
    )
}

export default ProductOrder