import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../NavBar/NavSideBar'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import '../../css/style.css'
import axios from 'axios'



function QnAPost(props){
    const [userName,setUserName] = useState("");
    const [postPW,setPostPW] = useState("");
    const [postTitle,setPostTitle] = useState("");
    const [postContent,setPostContent] = useState("");
    const [productIndex,setProductIndex] = useState(0);

    const postTitleHandler = (event) =>{
        setPostTitle(event.target.value);
    }

    const postPWHandler = (event) =>{
        setPostPW(event.target.value);
    }

    const postContentHandler = (event) =>{
        setPostContent(event.target.value);
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        let body = {
            userName : userName,
            postPW : postPW,
            postTitle : postTitle,
            postContent : postContent,
            productIndex : productIndex
        }
        // pw 넘길 때 혹시 여기에 취약점이 있진 않을까
    }

    useEffect(()=>{
        setProductIndex(window.location.href.split('/')[4])
        axios.get('/api/getSession')
        .then(response=>{
            setUserName(response.data.ID)
        })
    },[])

    

    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent" style={{paddingTop:'0px'}}>
                            <p style={{fontSize:'20px', color:'#676767'}}>Q&amp;A</p>
                            <div className="writeContainer">
                                <form onSubmit={onSubmitHandler}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>NAME</td>
                                                <td><input value={userName} readOnly/></td>
                                                <td>PASSWORD</td>
                                                <td><input type="password" value={postPW} onChange={postPWHandler}/></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>TITLE</td>
                                                <td colspan='3'><input style={{width:'430px'}} value={postTitle} onChange={postTitleHandler}/></td>
                                            </tr>
                                            <tr>
                                                <td>CONTENT</td>
                                                <td colspan='3'><textarea value={postContent} onChange={postContentHandler}/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className='SubmitBtn' style={{left:'188px'}}>글 쓰기</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        </div>
        
    )
}

export default QnAPost