import React,{useEffect,useRef,useState} from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'
import { sendMail } from '../../../_actions/user_action'
import axios from 'axios'


function Help(props){
    const [userID, setUserID] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const [attachments, setAttachments] = useState([])
    const [category, setCategory] = useState('')

    const writeContainerRef = useRef();

    const dispatch = useDispatch()

    useEffect(() =>{
        axios.get('/api/getSession')
        .then(response=>{
            if (response.data===undefined){
                
            }else{
                setUserID(response.data.ID);
            }
        })
    },[])

    const onValueHandler = (event) =>{
        event.preventDefault();
        const {name,value} = event.target;
        switch (name){
            case 'email':
                setEmail(value);
                break;
            case 'subject':
                setSubject(value);
                break;
            case 'text':
                setText(value);
                break;
            case 'attachments':
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[0])
                reader.onload = function(e){
                    setAttachments((current)=>{
                        const newList = current
                        newList.push(e.target.result)
                        return newList
                    })
                }
                break;
            case 'category':
                setCategory(value);
                break;
        }
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        let body = {
            userID : userID,
            email : email,
            subject : subject,
            text : text,
            attachments : attachments,
            category : category
            
        }

        const loadingRendering = () =>{
            return(
                <div>
                    전송 중....
                </div>
            )
        }

        ReactDOM.render(loadingRendering(),writeContainerRef.current)

        dispatch(sendMail(body))
        .then(response=>{
            console.log(response);
            if (response.payload.data.sendMailSuccess){
                const completeRendering = () =>{
                    return(
                        <div>
                            전송되었습니다!
                        </div>
                    )
                }
                ReactDOM.render(completeRendering(),writeContainerRef.current);
            }
        })
    }

    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent" style={{paddingTop:'0px'}}>
                            <p style={{fontSize:'20px', color:'#676767'}}>1:1 문의</p>
                            <p>작성된 내용은 즉시 담당자에게 전달됩니다.</p>
                            <p>답변은 이메일 및 핸드폰 문자 메세지로 안내드립니다.</p>
                            <div className="writeContainer" ref={writeContainerRef}>
                                <form onSubmit={onSubmitHandler}>
                                    <table>
                                        <thead>
                                            <tr>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>TITLE</td>
                                                <td colSpan='3'><input value={subject} name='subject' style={{width:'430px'}} onChange={onValueHandler} required/></td>
                                            </tr>
                                            <tr>
                                                <td>EMAIL</td>
                                                <td><input value={email} name='email' style={{width:'275px'}} onChange={onValueHandler}></input></td>
                                                <td>CATEGORY</td>
                                                <td>
                                                    <select value={category} name='category' onChange={onValueHandler}>
                                                        <option value="none">선택</option>
                                                        <option value="일반문의">일반문의</option>
                                                        <option value="배송문의">배송문의</option>
                                                        <option value="반품/환불">반품/환불</option>
                                                        <option value="etc">기타</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>CONTENT</td>
                                                <td colSpan='3'><textarea value={text} name='text' onChange={onValueHandler} required/></td>
                                            </tr>
                                            <tr>
                                                <td>첨부파일</td>
                                                <td colSpan='3'><input type='file' name='attachments' onChange={onValueHandler}/></td>
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

export default Help