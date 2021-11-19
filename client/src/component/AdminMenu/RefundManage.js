import {BsArrowLeftCircleFill} from 'react-icons/bs'
import {gsap} from 'gsap'
import {useState,useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import axios from 'axios'

function RefundManage(){
    const [refundList,setRefundList] = useState([]);
    const [reasonList,setReasonList] = useState('');
    const [selectedIndex,setSelectedIndex] = useState(-1);

    const indexRef = useRef(-1);

    useEffect(()=>{
        axios.get('/api/getRefund')
        .then(response=>{
            if (response.data.status){
                setRefundList(response.data.refundList);
            }else{
                console.log('something err..')
            }
        })
    },[])

    useEffect(()=>{
        if (refundList.length>0){
            const refundRendering = () =>{
                const result = [];
                for (let i=0 ; i<refundList.length; i++){
                    result.push(
                        <li key={i} id={'refund'+i} name={refundList[i].orderID} onClick={viewRequest}>
                            {refundList[i].orderID}
                        </li>
                    )
                }
                return result;
                
            }
            ReactDOM.render(refundRendering(),document.querySelector('#usersList'))
        }
    },[refundList])

    const viewRequest = (event) =>{
        event.preventDefault();
        if (indexRef.current !== event.target.id.split('refund')[1]){
            while(document.querySelector('.funcDiv').hasChildNodes()){
                document.querySelector('.funcDiv').removeChild(document.querySelector('#funcDiv').firstChild)
            }
            setSelectedIndex(event.target.id.split('refund')[1])
            let body = {
                orderID:event.target.getAttribute('name')
            }
            axios.post('/api/getRefundReason',body)
            .then(response=>{
                if (response.data.status){
                    setReasonList(response.data.reasonList);
                }
            })
        }else{

        }
    }

    useEffect(()=>{
        if (typeof reasonList==='object' && selectedIndex!==-1){
            indexRef.current = selectedIndex;
            const reasonRendering = () =>{
                const result = [];
                let couponName=''
                if (refundList[selectedIndex].couponName.length===0){
                    couponName='none'
                }else{
                    couponName=refundList[selectedIndex].couponName
                }
                result.push(
                    <>
                        <hr className='adminMenuHR' style={{marginTop:'2vh', width:'100%'}}/>
                        <table className='MyPageOrderDetail' style={{fontSize:'1.4em', lineHeight:'30px'}}>
                            <tr style={{marginRight:'5vw'}}>
                                <td>주문번호</td>
                                <td>고객명</td>
                                <td>품명</td>
                                <td>전화번호</td>
                                <td>이메일</td>
                                <td>사용 적립금</td>
                                <td>사용 쿠폰명</td>
                                <td>사용 쿠폰금액</td>
                                <td>총 결제금액</td>
                            </tr>
                            <tr>
                                <td>{refundList[selectedIndex].orderID}</td>
                                <td>{refundList[selectedIndex].userID}</td>
                                <td>{refundList[selectedIndex].goodname}</td>
                                <td>{refundList[selectedIndex].buyertel}</td>
                                <td>{refundList[selectedIndex].buyeremail}</td>
                                <td>{refundList[selectedIndex].usedAccum}</td>
                                <td>{couponName}</td>
                                <td>{refundList[selectedIndex].usedCoupon}</td>
                                <td>{refundList[selectedIndex].totalPrice}</td>
                            </tr>
                        </table>
                        <hr className='adminMenuHR' style={{width:'100%'}}/>
                        <button className='SubmitBtn' 
                            style={{marginTop:'10vh', left:'8vw', width:'260px', height:'60px'}}
                            onClick={recallProgress}
                        >
                            <a>반품 처리 진행</a>
                        </button>
                    </>
                )
                return result;
            }
            ReactDOM.render(reasonRendering(),document.querySelector('.funcDiv'))
        }
    },[reasonList,selectedIndex])

    const recallProgress = (event) =>{
        event.preventDefault();
        let couponName = '';
        if (refundList[selectedIndex].couponName.length===0){
            couponName='none'
        }else{
            couponName=refundList[selectedIndex].couponName
        }
        let body = {
            orderID:refundList[selectedIndex].orderID,
            userID:refundList[selectedIndex].userID,
            buyeremail:refundList[selectedIndex].buyeremail,
            usedAccum:refundList[selectedIndex].usedAccum,
            couponName:couponName,
            couponVolume:refundList[selectedIndex].usedCoupon
        }
        // 1. 적립금 롤백
        // 2. 쿠폰 사용했으면 롤백. 
        // 3. 고객에게 반품 처리 진행 이메일 보내기
        // 4. 주문 내역 DB에서 삭제하거나, 환불 필드 새로 만들어서 환불된 걸로 보여주기.
        // 5. refund whether false로 돌리기.
        // 6. 만약 환불된 걸로 보여준다면... 5를 한 뒤에 해당 필드 값에 따라
        // 7. 상세 페이지의 환불 처리 버튼을 안보이게끔 해야겠지?
    }

    const textFloating = (event) =>{
        event.preventDefault();
        gsap.to('#backToText',{opacity:1, top:'-4px'})
    }
    const textHiding = (event) =>{
        event.preventDefault();
        gsap.to('#backToText',{opacity:0, top:'10px'})
    }
    const backToAdmin = (event) =>{
        event.preventDefault();
        const work = async () =>{
            await gsap.to('.adminMenu',{autoAlpha:'0',display:'none'})
            await gsap.to('.adminArea',{autoAlpha:'1',width:'100%',display:'block'})
        }
        work();
    }

    return(
        <div className='adminMenuDivContainer'>
            <div className='adminMenuDiv'>
                <div className='usersDiv'>
                    <p id='listTitle'>Refund Request</p>
                    <hr className='adminMenuHR'/>
                    <ul id='usersList' style={{marginLeft:'1vw',padding:'0'}}>

                    </ul>
                </div>
                <div className='funcDiv'>
            
                </div>
            </div>
            <div className='backToAdminMenus'>
                <BsArrowLeftCircleFill id='backArrow' 
                    onClick={backToAdmin} 
                    onMouseOver={textFloating} 
                    onMouseLeave={textHiding}/> 
                <span id='backToText'>
                    Back to Admin menus
                </span>
            </div>
        </div>
    )
}

export default RefundManage