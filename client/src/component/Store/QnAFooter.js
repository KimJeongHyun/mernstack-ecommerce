import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../NavBar/NavSideBar'
import '../../css/style.css'
import { NavBar } from '../NavBar/NavBar'
import axios from 'axios'
import { getQnAData } from '../../_actions/user_action'



function QnAFooter(props){
    const QnAFooterRef = useRef();
    const QnATBodyRef = useRef();
    const productIndex = props.clothMapNum;
    
    const [QnAMap,setQnAMap] = useState('');
    const [MapLength,setMapLength] = useState('');
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if (productIndex!=0){
            dispatch(getQnAData(productIndex))
            .then(response=>{
                setQnAMap(response.payload.QnAMap);
                setMapLength(response.payload.length);
            })
            
        }
    },[productIndex])

    useEffect(()=>{
        if(QnAMap!=''){
            console.log(Object.keys(QnAMap).length)
            //Product 별 데이터는 인덱스가 들쭉날쭉할 것.
            //일단 Map을 받고, 해당 맵에 대한 각각의 인덱스를 재정립해야됨.
        }
    },[QnAMap])
    

    return(
        <div ref={QnAFooterRef}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead style={{lineHeight:'40px',borderBottom:'0.5px solid black'}}>
                    <tr>
                        <td>번호</td>
                        <td>품명</td>
                        <td>제목</td>
                        <td>이름</td>
                        <td>날짜</td>
                    </tr>
                </thead>
                <tbody ref={QnATBodyRef} style={{lineHeight:'40px', borderBottom:'0.5px solid lightgray'}}>
                    
                </tbody>
            </table>
            <a href={"/QnAPost/"+productIndex}><button className='SubmitBtn' style={{marginLeft:'82%'}}>글 쓰기</button></a>
        </div>
    )
}

export default QnAFooter