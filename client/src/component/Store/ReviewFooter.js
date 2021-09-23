import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../NavBar/NavSideBar'
import '../../css/style.css'
import { NavBar } from '../NavBar/NavBar'
import axios from 'axios'
import { getReviewData } from '../../_actions/user_action'


function ReviewFooter(props){
    const ReviewFooterRef = useRef();
    const ReviewTBodyRef = useRef();
    const productIndex = props.clothMapNum;

    const [ReviewMap,setReviewMap] = useState('');
    const [MapLength,setMapLength] = useState('');
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if (productIndex!=0){
            dispatch(getReviewData(productIndex))
            .then(response=>{
                setReviewMap(response.payload.ReviewMap);
                setMapLength(response.payload.length);
            })
        }
    },[productIndex])

    useEffect(()=>{
        if(ReviewMap!=''){
            console.log(Object.keys(ReviewMap).length)
            //Product 별 데이터는 인덱스가 들쭉날쭉할 것.
            //일단 Map을 받고, 해당 맵에 대한 각각의 인덱스를 재정립해야됨.
        }
    },[ReviewMap])
    

    return(
        <div ref={ReviewFooterRef}>
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
                <tbody ref={ReviewTBodyRef} style={{lineHeight:'40px', borderBottom:'0.5px solid lightgray'}}>
                
                </tbody>
            </table>
            <a href={"/ReviewPost/"+productIndex}><button style={{width:'130px',height:'30px', marginTop:'30px', marginLeft:'82%', backgroundColor:'#8d8d8d', border:'none',color:'#fff', cursor:'pointer'}}>글 쓰기</button></a>
        </div>
    )
}

export default ReviewFooter