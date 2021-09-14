import React,{useEffect,useRef,useState} from 'react'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'



function Notice(props){
    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent">
                            <div className="NoticeDiv" style={{paddingLeft:'25%', width:'50%'}}>
                                <table style={{width:'100%', borderCollapse:'collapse'}}>
                                    <thead style={{lineHeight:'50px',borderBottom:'0.5px solid black'}}>
                                        <tr>
                                            <td>번호</td>
                                            <td>공지</td>
                                            <td>이름</td>
                                            <td>날짜</td>
                                        </tr>
                                    </thead>
                                    <tbody style={{lineHeight:'100px', borderBottom:'0.5px solid lightgray'}}>
                                        <tr>
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
                                        </tr>
                                        <tr>
                                            <td>asdf</td>
                                            <td>asdf</td>
                                            <td>asdf</td>
                                            <td>asdf</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button style={{width:'170px',height:'50px', marginTop:'10px', marginLeft:'73%', backgroundColor:'#8d8d8d', border:'none',color:'#fff', cursor:'pointer'}}>글 쓰기</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        </div>
        
    )
}

export default Notice