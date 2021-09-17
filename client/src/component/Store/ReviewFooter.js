import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../NavBar/NavSideBar'
import '../../css/style.css'
import { NavBar } from '../NavBar/NavBar'
import axios from 'axios'



function ReviewFooter(props){
    const clothMap = props.clothMap;
    const ReviewFooterRef = useRef();
    if (clothMap!=''){
        
    }
    

    return(
        <div ref={ReviewFooterRef}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead style={{lineHeight:'50px',borderBottom:'0.5px solid black'}}>
                    <tr>
                        <td>번호</td>
                        <td>품명</td>
                        <td>제목</td>
                        <td>이름</td>
                        <td>날짜</td>
                    </tr>
                </thead>
                <tbody style={{lineHeight:'50px', borderBottom:'0.5px solid lightgray'}}>
                    <tr>
                        <td>asdf</td>
                        <td>asdf</td>
                        <td>asdf</td>
                        <td>asdf</td>
                        <td>asdf</td>
                    </tr>
                    <tr>
                        <td>asdf</td>
                        <td>asdf</td>
                        <td>asdf</td>
                        <td>asdf</td>
                        <td>asdf</td>
                    </tr>
                    <tr>
                        <td>asdf</td>
                        <td>asdf</td>
                        <td>asdf</td>
                        <td>asdf</td>
                        <td>asdf</td>
                    </tr>
                </tbody>
            </table>
            <button style={{width:'130px',height:'30px', marginTop:'10px', marginLeft:'82%', backgroundColor:'#8d8d8d', border:'none',color:'#fff', cursor:'pointer'}}>글 쓰기</button>
        </div>
    )
}

export default ReviewFooter