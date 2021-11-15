import axios from 'axios';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
 
function PopupContent(props){
    const reasonList = props.reasonList;
    const couponVolume = props.couponVolume;
    const createdAtList = props.createdAtList;
    const expiredAtList = props.expiredAtList;
    const length = reasonList.length;

    const setCouponVolume = (event) =>{
        event.preventDefault();
        props.handleCouponVolume(event.target.getAttribute('name'));
    }

    useEffect(()=>{
        const couponList = document.getElementsByClassName('couponList')[0]
        const couponRendering = () =>{
            const result = [];
            for (let i=0; i<length; i++){
                result.push(
                    <li name={couponVolume[i]} onClick={(e)=>{ setCouponVolume(e) }}>
                        <span name={couponVolume[i]+'  '+reasonList[i]}>{reasonList[i]}</span>
                        <br/>
                        <span style={{marginRight:'10px'}} name={couponVolume[i]}>{couponVolume[i]}</span>
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