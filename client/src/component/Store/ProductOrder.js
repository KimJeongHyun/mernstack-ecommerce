import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { NavSideBar } from '../NavBar/NavSideBar'
import '../../css/style.css'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'


function ProductOrder(props){
    const loc = useLocation();
    const [clothMap,setClothMap] = useState({});
    const [colorList,setColorList] = useState([]);
    const [sizeList,setSizeList] = useState([]);
    const [volList,setVolList] = useState([])
    const [totalVol,setTotalVol] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);

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
        }
    },[])
    
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
                            orderClientInfoArea. 이름, 이메일, 연락처
                        </div>
                        <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                        <div className='addressInfo'>
                            addressInfoArea. 이름, 전화, 배송지 선택, 주소, 주문메세지, 입금자명
                        </div>
                        <hr style={{border:'none',backgroundColor:'lightgray', width:'40%', height:'1px', margin:'0'}}/>    
                        <div className='discountApply'>
                            discountApplyArea. 적립금 사용 및 쿠폰 조회
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
                            totalArea. 총 금액 및 요약
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