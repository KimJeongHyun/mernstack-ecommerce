import axios from 'axios';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
 
function PopupContent(props){
    let couponName = 'none';
    if (props.couponName!==undefined){
        couponName=props.couponName;
    }

    const test = () =>{
        if (window.confirm('취소하시겠습니까?')){
            console.log('hi');
        }else{
            console.log('bye');
        }
    }

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
                            <td>{props.goodname}</td>
                            <td>{props.createdAt.split('T')[0]}</td>
                            <td>{props.usedAccum}</td>
                            <td>{couponName}</td>
                            <td>{props.usedCoupon}</td>
                            <td>{props.totalPrice} 원</td>
                        </tr>
                    </table>
                    <button className='SubmitBtn' style={{top:'5vh',left:'1.8vw', display:'block'}} onClick={test}><a>취소 요청</a></button>
                    <br/>
                    <button className='SubmitBtn' style={{top:'5vh',left:'1.8vw'}} onClick={props.onClose}><a>닫기</a></button>
                </div>
            </div>
        </div>
    )
}
 
export default PopupContent;