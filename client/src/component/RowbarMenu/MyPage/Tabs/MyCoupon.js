import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'

export function MyCouponRendering(){

    const [reasonList,setReasonList] = useState([])
    const [couponVolumeList,setCouponVolumeList] = useState([])
    const [createdAtList,setCreatedAtList] = useState([])
    const [expiredAtList,setExpiredAtList] = useState([])
    const couponTableRef = useRef();

    const setSTR = (dt) =>{
        const dtYear = dt.getFullYear();

        let dtMonth = ''
        if (dt.getMonth()==0){
            dtMonth=12;
        }else{
            dtMonth=dt.getMonth()+1
        }

        const dtDay = dt.getDate();

        let result = dtYear+'-'+dtMonth+'-'+dtDay;
        return result;
    }

    useEffect(()=>{
        axios.get('/api/getCoupon')
        .then(response=>{
            const resData = response.data;
            if (resData.reasonList!==undefined){
                setReasonList(resData.reasonList);
                setCouponVolumeList(resData.couponVolume);
                setCreatedAtList(resData.createdAtList);
                setExpiredAtList(resData.expiredAtList);
            }
        })
    },[])

    useEffect(()=>{
        if (reasonList.length!=0 && couponVolumeList.length!=0 && createdAtList.length!=0 && expiredAtList.length!=0){
            for (let i=0; i<reasonList.length; i++){
                let d = new Date(createdAtList[i]);
                let e = new Date(expiredAtList[i]);
                let n = new Date();
                n.setUTCHours(0,0,0,0);
                e.setUTCHours(0,0,0,0);

                const msDay = 60*60*24*1000
                
                const dDay = Math.floor(e-n)/msDay;

                const startStr = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
                const expireStr = e.getFullYear()+'-'+(e.getMonth()+1)+'-'+e.getDate()
                const durationStr = startStr+' ~ '+expireStr;
                
                const trTag = document.createElement('tr');
                
                const reasonTD = document.createElement('td');
                const reasonText = document.createTextNode(reasonList[i]);
                reasonTD.appendChild(reasonText);

                const couponTD = document.createElement('td');
                const couponText = document.createTextNode(couponVolumeList[i]);
                couponTD.appendChild(couponText);

                const durationTD = document.createElement('td');
                const durationText = document.createTextNode(durationStr)
                durationTD.appendChild(durationText);

                const dDayTD = document.createElement('td');
                const dDayText = document.createTextNode(dDay);
                dDayTD.appendChild(dDayText);

                trTag.appendChild(reasonTD);
                trTag.appendChild(couponTD);
                trTag.appendChild(durationTD);
                trTag.appendChild(dDayTD);
                

                couponTableRef.current.appendChild(trTag);
            }
        }
    },[reasonList,couponVolumeList,createdAtList,expiredAtList])

    return(
        <table className='couponTable' style={{width:'80%', textAlign:'center', borderCollapse:'collapse'}}>
            <thead style={{lineHeight:'20px',borderTop:'2px solid lightgray',borderBottom:'0.5px solid lightgray'}}>
                <tr>
                    <th>????????????</th>
                    <th>??????????????????</th>
                    <th>????????????</th>
                    <th>D-Day</th>
                </tr>
            </thead>
            <tbody ref={couponTableRef} style={{lineHeight:'30px', borderBottom:'0.5px solid lightgray'}}>
                
            </tbody>
        </table>
    )
}

