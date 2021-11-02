import axios from 'axios'
import React,{useEffect,useState,useRef} from 'react'

export function MyAccumRendering(){

    const [reasonList,setReasonList] = useState([])
    const [accumList,setAccumList] = useState([])
    const [totalAccum,setTotalAccum] = useState(0)

    const accumTableRef = useRef();

    useEffect(()=>{
        axios.get('/api/getAccumLog')
        .then(response=>{
            if (response.data.getAccumSuccess){
                const resData = response.data;
                setReasonList(resData.reasonList);
                setAccumList(resData.accumList);
                setTotalAccum(resData.totalAccum);
            }
        })
    },[])

    useEffect(()=>{
        if (reasonList.length!=0 && accumList.length!=0 && totalAccum!=0){
            for (let i=reasonList.length-1; i>=0; i--){
                const trTag = document.createElement('tr');

                const reasonTD = document.createElement('td');
                const reasonText = document.createTextNode(reasonList[i]);
                reasonTD.appendChild(reasonText);

                const accumTD = document.createElement('td');
                const accumText = document.createTextNode(accumList[i]);
                accumTD.appendChild(accumText);

                const totalTD = document.createElement('td');
                const totalText = document.createTextNode(totalAccum);
                totalTD.appendChild(totalText);

                trTag.appendChild(reasonTD);
                trTag.appendChild(accumTD);
                trTag.appendChild(totalTD);

                accumTableRef.current.appendChild(trTag);
            }

        }
    },[reasonList,accumList,totalAccum])

    return(
        <table className='accumTable' style={{width:'80%', textAlign:'center', borderCollapse:'collapse'}}>
            <thead style={{lineHeight:'20px',borderTop:'2px solid lightgray',borderBottom:'0.5px solid lightgray'}}>
                <tr>
                    <th>적립내용</th>
                    <th>적립내역</th>
                    <th>총 적립금</th>
                </tr>
            </thead>
            <tbody ref={accumTableRef} style={{lineHeight:'30px', borderBottom:'0.5px solid lightgray'}}>
            </tbody>
        </table>
    )
}

