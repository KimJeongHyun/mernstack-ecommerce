import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'
import { getCart } from '../../../_actions/user_action'
import axios from 'axios'


function Cart(props){
    const PostNum = 10;

    const CartTBodyRef = useRef();
    const CartPaginationRef = useRef();

    const [CartMap,setCartMap] = useState('');
    const [MapLength,setMapLength] = useState('')
    const [PostPaging, setPostPaging] = useState(1);
    const [deleteList,setDeleteList] = useState([]);
    const dispatch = useDispatch()

    useEffect(() =>{
        axios.get('/api/getSession')
        .then(response=>{
            const userID = response.data.ID;
            const body = {
                userID:userID
            }
            dispatch(getCart(body))
            .then(response=>{
                setMapLength(response.payload.data.length);
                setCartMap(response.payload.data.CartMap);
            })
        })
    },[])

    const postPagingHandler = (event) =>{
        event.preventDefault();
        const propPagingNum = event.target.classList.value.split('CartPaging')[1];
        if (propPagingNum!=PostPaging){
            setPostPaging(propPagingNum)
        }
    }

    const deleteListCheck = (event) =>{
        event.preventDefault();
        if (event.target.checked){
            setDeleteList(deleteList.concat(event.target.classList.add))
        }else{
            console.log(deleteList);
        }
    }

    useEffect(()=>{
        const footerRendering = () =>{
            const result=[];
            for (let i=0; i<MapLength/PostNum; i++){
                result.push(
                    <span onClick={postPagingHandler}>
                        <a className={'CartPaging'+(i+1)} href="#none" >[{i+1}]</a>
                    </span>
                )
            }
            ReactDOM.render(result,CartPaginationRef.current);
        }
        if (MapLength!=''){
            footerRendering();
        }
        
    },[MapLength])

    useEffect(()=>{
        while(CartTBodyRef.current.hasChildNodes()){
            CartTBodyRef.current.removeChild(CartTBodyRef.current.firstChild)
        }
        if(CartMap!='' && MapLength!=''){
            let cnt = 0;
            let targetClassName='';
            for (let i=((PostPaging*PostNum)-PostNum); i<(PostPaging*PostNum); i++){
                if (i>=MapLength){
                    break;
                }else{
                    if (cnt!=5){
                        const trTag = document.createElement('tr');
                        trTag.className = 'Cart'+cnt;
                        targetClassName = 'Cart'+cnt;
                        CartTBodyRef.current.appendChild(trTag);
                        cnt=cnt+1;
                    }else{
                        cnt=0
                    }
                    
                    const tdTagNum = document.createElement('td');
                    const tdTagNumText = document.createTextNode(i)
                    tdTagNum.appendChild(tdTagNumText);

                    const tdTagProduct = document.createElement('td');
                    const tdTagProductA = document.createElement('a');
                    tdTagProductA.href='/ProductDetail/'+CartMap[i].clothIndex;
                    tdTagProductA.classList.add('productName')
                    const tdTagProductText = document.createTextNode(CartMap[i].clothName);
                    tdTagProductA.appendChild(tdTagProductText);
                    tdTagProduct.appendChild(tdTagProductA);

                    const tdTagPrice = document.createElement('td');
                    const tdTagPriceText = document.createTextNode((CartMap[i].sellPrice)+' ₩');
                    tdTagPrice.appendChild(tdTagPriceText);

                    const tdTagDiscountRate = document.createElement('td');
                    const tdTagDiscountRateText = document.createTextNode((CartMap[i].discountRate)+'%');
                    tdTagDiscountRate.appendChild(tdTagDiscountRateText);

                    const tdTagDiscountPrice = document.createElement('td');
                    const tdTagDiscountPriceText = document.createTextNode((CartMap[i].sellPrice)*(100-(CartMap[i].discountRate))*0.01+' ₩');
                    tdTagDiscountPrice.appendChild(tdTagDiscountPriceText);

                    const tdTagAccumPrice = document.createElement('td');
                    const tdTagAccumPriceText = document.createTextNode((CartMap[i].sellPrice)*0.1+' ₩');
                    tdTagAccumPrice.appendChild(tdTagAccumPriceText);


                    const tdTagDelivery = document.createElement('td');
                    const tdTagDeliveryText = document.createTextNode('2500'+' ₩');
                    tdTagDelivery.appendChild(tdTagDeliveryText);

                    const tdCheckBtn = document.createElement('td');
                    const tdCheckBtnElement = document.createElement('input');
                    tdCheckBtnElement.type='checkbox'
                    tdCheckBtnElement.classList.add='Prod'+CartMap[i].clothIndex;
                    tdCheckBtnElement.style.marginTop='20px'
                    tdCheckBtnElement.onchange=deleteListCheck
                    tdCheckBtn.appendChild(tdCheckBtnElement);

                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagNum);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagProduct);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagPrice);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagDiscountRate);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagDiscountPrice);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagAccumPrice);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagDelivery);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdCheckBtn);
                    
                }
            }
            
            //Product 별 데이터는 인덱스가 들쭉날쭉할 것.
            //일단 Map을 받고, 해당 맵에 대한 각각의 인덱스를 재정립해야됨.
        }
    },[CartMap,MapLength,PostPaging])

    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent">
                            <div className="CartDiv" style={{paddingLeft:'25%', width:'50%'}}>
                                <table style={{width:'100%', borderCollapse:'collapse'}}>
                                    <thead style={{lineHeight:'50px',borderBottom:'0.5px solid black'}}>
                                        <tr>
                                            <td>번호</td>
                                            <td>품명</td>
                                            <td>가격</td>
                                            <td>할인율</td>
                                            <td>할인가격</td>
                                            <td>적립금</td>
                                            <td>배송비</td>
                                            <td>체크</td>
                                        </tr>
                                    </thead>
                                    <tbody ref={CartTBodyRef} style={{lineHeight:'50px', borderBottom:'0.5px solid lightgray'}}>
                                        
                                    </tbody>
                                </table>
                                <div ref={CartPaginationRef}>
                                
                                </div>
                                <button style={{width:'170px',height:'50px', marginTop:'10px', marginRight:'10px', backgroundColor:'#8d8d8d', border:'none',color:'#fff', cursor:'pointer'}}>주문하기</button>
                                <button style={{width:'170px',height:'50px', border:'0.5px solid lightgray', backgroundColor:'#fff', cursor:'pointer'}}>장바구니 비우기</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        </div>
        
    )
}

export default Cart