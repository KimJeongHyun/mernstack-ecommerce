import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'
import InternalPreviewGroup from 'antd/lib/image/PreviewGroup'

export function MyCouponRendering(){

    const [reasonList,setReasonList] = useState([])
    const [couponVolumeList,setCouponVolumeList] = useState([])
    const [ttlList,setTtlList] = useState([])
    const couponTableRef = useRef();

    const setSTR = (dt) =>{
        const dtYear = dt.getFullYear();

        let dtMonth = ''
        if (dt.getMonth()==0){
            dtMonth=12;
        }else{
            dtMonth=dt.getMonth()+1
        }

        const dtDay = dt.getDay();

        let result = dtYear+'-'+dtMonth+'-'+dtDay;
        return result;
    }

    useEffect(()=>{
        axios.get('/api/getCoupon')
        .then(response=>{
            const resData = response.data;
            setReasonList(resData.reasonList);
            setCouponVolumeList(resData.couponVolume);
            setTtlList((current)=>{
                const newList = [];
                for (let i=0; i<resData.ttlList.length; i++){
                    const originDT = new Date(resData.ttlList[i]);
                    const originDTSTR = setSTR(originDT)

                    const newDT = new Date(resData.ttlList[i])
                    newDT.setDate(newDT.getDate()+30)
                    const newDTSTR = setSTR(newDT);
                    newList.push(originDTSTR+' ~ ' +newDTSTR);
                }
                return newList;
            })
        })
    },[])

    useEffect(()=>{
        if (reasonList.length!=0 && couponVolumeList.length!=0 && ttlList.length!=0){
            for (let i=0; i<reasonList.length; i++){
                const trTag = document.createElement('tr');
                
                const reasonTD = document.createElement('td');
                const reasonText = document.createTextNode(reasonList[i]);
                reasonTD.appendChild(reasonText);

                const couponTD = document.createElement('td');
                const couponText = document.createTextNode(couponVolumeList[i]);
                couponTD.appendChild(couponText);

                const ttlTD = document.createElement('td');
                const ttlText = document.createTextNode(ttlList[i])
                ttlTD.appendChild(ttlText);

                trTag.appendChild(reasonTD);
                trTag.appendChild(couponTD);
                trTag.appendChild(ttlTD);

                couponTableRef.current.appendChild(trTag);
            }
        }
    },[reasonList,couponVolumeList,ttlList])

    return(
        <table className='couponTable' style={{width:'80%', textAlign:'center', borderCollapse:'collapse'}}>
            <thead style={{lineHeight:'20px',borderTop:'2px solid lightgray',borderBottom:'0.5px solid lightgray'}}>
                <tr>
                    <th>쿠폰이름</th>
                    <th>사용가능금액</th>
                    <th>사용기간</th>
                </tr>
            </thead>
            <tbody ref={couponTableRef} style={{lineHeight:'30px', borderBottom:'0.5px solid lightgray'}}>
                
            </tbody>
        </table>
    )
}

