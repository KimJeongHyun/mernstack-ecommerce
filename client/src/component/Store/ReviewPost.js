import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../NavBar/NavSideBar'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import '../../css/style.css'
import axios from 'axios'
import { postReviewData, getDetailData } from '../../_actions/user_action'


function ReviewPost(props){
    const [userID,setUserID] = useState("");
    const [postPW,setPostPW] = useState("");
    const [postTitle,setPostTitle] = useState("");
    const [postContent,setPostContent] = useState("");
    const [clothIndex,setClothIndex] = useState(0);
    const [clothName,setClothName] = useState("");

    const dispatch = useDispatch()

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
            userID : userID,
            postPW : postPW,
            postTitle : postTitle,
            postContent : postContent,
            clothIndex : clothIndex,
            clothName : clothName
        }
        dispatch(postReviewData(body))
        .then(response=>{
            if(response.payload.postReviewData){
                alert('등록되었습니다.');
                window.location.href='/ProductDetail/'+clothIndex;
            }else{
                alert('오류가 발생했습니다.');
                window.location.href='/ProductDetail/'+clothIndex;
            }
        })
    }

    useEffect(()=>{
        setClothIndex(window.location.href.split('/')[4])
        axios.get('/api/getSession')
        .then(response=>{
            setUserID(response.data.ID)
        })

    },[])

    useEffect(()=>{
        if (clothIndex!=''){
            dispatch(getDetailData(clothIndex))
            .then(response=>{
                setClothName(response.payload.clothRes.clothName);
            })
        }
    },[clothIndex])

    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent" style={{paddingTop:'0px'}}>
                            <p style={{fontSize:'20px', color:'#676767'}}> Review </p>
                            <div className="writeContainer">
                                <form onSubmit={onSubmitHandler}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>NAME</td>
                                                <td><input value={userID}/></td>
                                                <td>PASSWORD</td>
                                                <td><input type="password" value={postPW} onChange={postPWHandler} required/></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>TITLE</td>
                                                <td colspan='3'><input style={{width:'430px'}} value={postTitle} onChange={postTitleHandler} required/></td>
                                            </tr>
                                            <tr>
                                                <td>CONTENT</td>
                                                <td colspan='3'><textarea value={postContent} onChange={postContentHandler} required/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className='SubmitBtn' style={{left:'188px', cursor:'pointer', color:'#fff'}}>글 쓰기</button>
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

export default ReviewPost