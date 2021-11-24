import axios from 'axios';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
 
function PopupContent(props){
    let couponName = 'none';
    console.log();
    if (props.couponName!==undefined && props.couponName.length!==0){
        couponName=props.couponName;
    }

    const recall = (event) =>{
        event.preventDefault();
        let recallReason=document.getElementById('recallField').value
        if (window.confirm('취소하시겠습니까?')){
            let body = {
                orderID:props.orderID,
                recallReason:recallReason
            }
            axios.post('/api/refundRequest',body)
            .then(response=>{
                if (response.data.status){
                    alert('취소 요청이 진행되었습니다.')
                    window.location.href='http://localhost:3000/MyPage'
                    
                }else{
                    alert('오류가 발생했습니다. 1:1 문의를 이용하시기 바랍니다.')
                    window.location.href='http://localhost:3000/MyPage'
                }
            })

        }else{
            
        }
    }

    const recallView = (event) =>{
        event.preventDefault();
        const recallViewRendering = () =>{
            const result = [];
            result.push(
                <>
                <table style={{margin:'0', textAlign:'center'}}>
                    <tr>
                        <td>취소 사유 입력</td>
                    </tr>
                    <tr>
                        <td><input id='recallField'></input></td>
                    </tr>
                </table>
                <button className='SubmitBtn' style={{top:'5vh',left:'1.8vw', display:'block'}} onClick={recall}><a>제출</a></button>
                <br/>
                <button className='SubmitBtn' style={{top:'5vh',left:'1.8vw'}} onClick={props.onClose}><a>닫기</a></button>
                </>

            )
            return result;
        }
        ReactDOM.render(recallViewRendering(),document.querySelector('.common_alert'))
    }

    useEffect(()=>{
        if (props.refundWhether || ((props.refundWhether===false) && props.goodname.split('(반품 처리)').length>1)){
            document.getElementById('recallBtn').style.display='none'
        }
        
    },[])

    return(
        <div className="dimmed_layer_wrapper">
            <div className="full_layer" style={{top:'20vh'}}>
                <div className="common_alert" style={{minWidth:'400px',padding:'6vh 6.8vw 12vh 6vw'}}>
                    <table className='MyPageOrderDetail'>
                        <tr>
                            <td>품명</td>
                            <td>구매일자</td>
                            <td>사용 적립금</td>
                            <td>사용 쿠폰</td>
                            <td>쿠폰 금액</td>
                            <td>결제 금액</td>
                        </tr>
                        <tr>
                            <td>{props.goodname.split('(반품 처리)')[0]}</td>
                            <td>{props.createdAt.split('T')[0]}</td>
                            <td>{props.usedAccum}</td>
                            <td>{couponName}</td>
                            <td>{props.usedCoupon}</td>
                            <td>{props.totalPrice} 원</td>
                        </tr>
                    </table>
                    <button id='recallBtn' className='SubmitBtn' style={{top:'5vh',left:'1.8vw', display:'block'}} onClick={recallView}><a>취소 요청</a></button>
                    <br/>
                    <button className='SubmitBtn' style={{top:'5vh',left:'1.8vw'}} onClick={props.onClose}><a>닫기</a></button>
                </div>
            </div>
        </div>
    )
}
 
export default PopupContent;