import axios from 'axios'
import React, {useEffect,useState,useRef} from 'react'
import PopupDom from './PopupDom';
import PopupContent from './PopupContent';

export function MyOrderRendering(){

    const [orderLog, setOrderLog] = useState([]);
    const [orderIndex, setOrderIndex] = useState('');
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const tbodyRef = useRef();

    const openPopup = (event) =>{
        event.preventDefault();
        setOrderIndex(event.target.getAttribute('name').split('order')[1]);
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

    
    useEffect(()=>{
        axios.get('/api/getOrderLog')
        .then(response=>{
            setOrderLog(response.data.orderList);
        })
    },[])

    useEffect(()=>{
        if (orderLog.length>0){
            for (let i=orderLog.length-1; i>=0; i--){
                const number = parseInt(orderLog.length)-i;
                const payDate = orderLog[i].createdAt.split('T')[0];
                const goodname = orderLog[i].goodname;
                const totalPrice = orderLog[i].totalPrice;

                const trTag = document.createElement('tr');
                
                const numberTD = document.createElement('td');
                const numberText = document.createTextNode(number);
                numberTD.appendChild(numberText);

                const payDateTD = document.createElement('td');
                const payDateText = document.createTextNode(payDate);
                payDateTD.appendChild(payDateText);

                const goodnameTD = document.createElement('td');
                const goodnameText = document.createTextNode(goodname);
                goodnameTD.appendChild(goodnameText);

                const totalPriceTD = document.createElement('td');
                const totalPriceText = document.createTextNode(totalPrice);
                totalPriceTD.appendChild(totalPriceText);

                const clickBtnTD = document.createElement('td');
                const clickBtnI = document.createElement('i');
                clickBtnI.setAttribute('name','order'+i)
                clickBtnI.setAttribute('class','far fa-check-circle')
                clickBtnI.onclick=openPopup;
                clickBtnTD.appendChild(clickBtnI);

                trTag.appendChild(numberTD);
                trTag.appendChild(payDateTD);
                trTag.appendChild(goodnameTD);
                trTag.appendChild(totalPriceTD);
                trTag.appendChild(clickBtnTD);

                tbodyRef.current.appendChild(trTag);

            }
        }
    },[orderLog])




    return(
        <>
            <table className='selectTable' style={{width:'80%', textAlign:'center', borderCollapse:'collapse'}}>
                <thead style={{lineHeight:'20px',borderTop:'2px solid lightgray',borderBottom:'0.5px solid lightgray'}}>
                    <tr>
                        <th>번호</th>
                        <th>주문일자</th>
                        <th>품명</th>
                        <th>결제금액</th>
                        <th>주문상세</th>
                    </tr>
                </thead>
                <tbody ref={tbodyRef} style={{lineHeight:'30px', borderBottom:'0.5px solid lightgray'}}>

                </tbody>
            </table>
            <div id='popupDom'>
            {
            isOpenPopup && 
                <PopupDom>
                    <PopupContent onClose={closePopup}
                        goodname={orderLog[orderIndex].goodname}
                        createdAt={orderLog[orderIndex].createdAt.split('T')[0]}
                        usedAccum={orderLog[orderIndex].usedAccum}
                        usedCoupon={orderLog[orderIndex].usedCoupon}
                        totalPrice={orderLog[orderIndex].totalPrice}
                    />    
                </PopupDom>
            }
            </div>
        </>
    )
}

