import axios from 'axios';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
 
function PopupContent(props){
    const reasonList = props.reasonList;
    const couponVolume = props.couponVolume;
    const createdAtList = props.createdAtList;
    const expiredAtList = props.expiredAtList;
    const couponIDList = props.couponIDList;
    const length = reasonList.length;

    const setCouponVolume = (event) =>{
        event.preventDefault();
        const index = event.target.getAttribute('name').split('index')[1]
        props.handleCouponVolume(couponVolume[index]);
        props.handleCouponID(couponIDList[index]);
        props.handleCouponPrice(couponVolume[index])
        props.handleCouponName(reasonList[index])
        props.handleCouponTTL(expiredAtList[index])
    }

    useEffect(()=>{
        const couponList = document.getElementsByClassName('couponList')[0]
        const couponRendering = () =>{
            const result = [];
            for (let i=0; i<length; i++){
                result.push(
                    <li name={'index'+i} onClick={(e)=>{ setCouponVolume(e) }}>
                        <span name={'index'+i}>{reasonList[i]}</span>
                        <br/>
                        <span name={'index'+i} style={{marginRight:'10px'}}>{couponVolume[i]}</span>
                    </li>
                )
            }
            return result;
        }
        ReactDOM.render(couponRendering(),couponList);
    },[])

    return(
        <div className="dimmed_layer_wrapper">
            <div className="full_layer">
                <div className="common_alert"> 
                    <ul className='couponList'>
                    
                    </ul>
                    <div>
                        <button className='SubmitBtn' style={{left:'1.8vw'}} onClick={props.onClose}><a>닫기</a></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default PopupContent;