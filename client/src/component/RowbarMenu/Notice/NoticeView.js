import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'
import { getNoticeOne } from '../../../_actions/user_action'



function NoticeView(props){
    const [userID, setUserID] = useState('');
    const [postTitle,setPostTitle] = useState("");
    const [postContent,setPostContent] = useState("");
    const dispatch = useDispatch()

    const NoticeIndex = props.location.pathname.split('/')[2]
    const NoticeID = props.location.pathname.split('/')[3]
    useEffect(() => {
        dispatch(getNoticeOne(NoticeIndex,NoticeID))
        .then(response=>{
            const NoticeMap = response.payload.NoticeMap[1];
            setUserID(NoticeMap.userID);
            setPostTitle(NoticeMap.title);
            setPostContent(NoticeMap.content);
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
                                <table>
                                    <thead>
                                        <tr>
                                            <td>NAME</td>
                                            <td><input style={{width:'430px'}} value={userID} readOnly/></td>
                
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>TITLE</td>
                                            <td colSpan='3'><input style={{width:'430px'}} value={postTitle} readOnly/></td>
                                        </tr>
                                        <tr>
                                            <td>CONTENT</td>
                                            <td colSpan='3'><textarea value={postContent} readOnly/></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className='SubmitBtn' style={{marginLeft:'380px'}}><a href={'/Notice/'}>뒤로 가기</a></button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        </div>
        
    )
}

export default NoticeView