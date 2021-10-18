import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'
import { NavSideBar } from '../NavBar/NavSideBar'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import '../../css/style.css'
import axios from 'axios'
import { postQnAData, getDetailData } from '../../_actions/user_action'



function QnAPost(props){
    const [userID,setUserID] = useState("");
    const [postPW,setPostPW] = useState("");
    const [postTitle,setPostTitle] = useState("");
    const [postContent,setPostContent] = useState("");
    const [clothIndex,setClothIndex] = useState("");
    const [clothName,setClothName] = useState("");

    const dispatch = useDispatch()


    const onValueHandler = (event) =>{
        event.preventDefault();
        const {name,value} = event.target;
        switch (name){
            case 'title':
                setPostTitle(value)
                break;
            case 'content':
                setPostContent(value)
                break;
            case 'pw':
                setPostPW(value)
                break;
        }
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
        dispatch(postQnAData(body))
        .then(response=>{
            if(response.payload.postQnAData){
                alert('등록되었습니다.');
                window.location.href='/ProductDetail/'+clothIndex;
            }else{
                alert('오류가 발생했습니다.');
                window.location.href='/ProductDetail/'+clothIndex;
            }
        })
        // pw 넘길 때 혹시 여기에 취약점이 있진 않을까
    }

    useEffect(()=>{
        setClothIndex(window.location.href.split('/')[4])
        axios.get('/api/getSession')
        .then(response=>{
            setUserID(response.data.ID)
        })
    },[])

    useEffect(()=>{
        if (clothIndex!==''){
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
                            <p style={{fontSize:'20px', color:'#676767'}}>Q&amp;A</p>
                            <div className="writeContainer">
                                <form onSubmit={onSubmitHandler}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>NAME</td>
                                                <td><input value={userID} readOnly/></td>
                                                <td>PASSWORD</td>
                                                <td><input type="password" value={postPW} onChange={onValueHandler} name='pw' required/></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>TITLE</td>
                                                <td colspan='3'><input style={{width:'430px'}} value={postTitle} name='title' onChange={onValueHandler} required/></td>
                                            </tr>
                                            <tr>
                                                <td>CONTENT</td>
                                                <td colspan='3'><textarea value={postContent} name='content' onChange={onValueHandler} required/></td>
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

export default QnAPost