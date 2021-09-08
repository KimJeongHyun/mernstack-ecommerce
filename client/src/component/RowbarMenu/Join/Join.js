import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router'
import { registerUser } from '../../../_actions/user_action'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'
import axios from 'axios'



function Join(props){

    const joinBtn = useRef();

    const dispatch = useDispatch();

    const [Name,setName] = useState("")
    const [ID, setID] = useState("")
    const [Password,setPassword] = useState("")
    const [Password2,setPassword2] = useState("")
    const [Email,setEmail] = useState("")
    const [Phone,setPhone] = useState("")

    const onNameHandler = (event) =>{
        setName(event.target.value);
    }

    const onIDHandler = (event) =>{
        setID(event.target.value);
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.target.value);
    }

    const onPassword2Handler = (event) =>{
        setPassword2(event.target.value);
    }

    const onEmailHandler = (event) =>{
        setEmail(event.target.value);
    }

    const onPhoneHandler = (event) =>{
        if (event.target.value.length<=11){
            setPhone(event.target.value);
        }
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();

        if (Phone.length<11){
            alert('핸드폰 번호를 정확히 입력해주시기 바랍니다.')
        }

        let body={
            Name:Name,
            ID:ID,
            Password:Password,
            Password2:Password2,
            Email:Email,
            Phone:Phone
        }
        dispatch(registerUser(body))
        .then(response=>{
            if (response.payload.registerSuccess){
                alert('환영합니다!')
                props.history.push({
                    pathname:"/"
                })
            }else{
                alert('다시 시도해주시기 바랍니다.')
                props.histroy.push({
                    pathname:"/Join"
                })
            }
        })
    }

    useEffect(()=>{
        if (Name!='' && ID!='' && Password!='' && Password2!='' && Email!='' && Phone!=''){
            if (Phone.length==11 && Email.includes('@')){
                joinBtn.current.classList.remove('notEnough');
                joinBtn.current.removeAttribute('disabled');
            }
            
        }

        if (Name=='' || ID=='' || Password=='' || Password2=='' || Email=='' || Phone==''){
            joinBtn.current.classList.add('notEnough');
            joinBtn.current.setAttribute('disabled',true);
        }


    },[Name,ID,Password,Password2,Email,Phone])

    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent">
                            <div className="inputDiv">
                                <form className="inputForm" onSubmit={onSubmitHandler}>
                                    <fieldset style={{border:'none'}}>
                                        <legend style={{visibility:'hidden'}}>Join Form</legend>
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <input placeholder="NAME" value={Name} onChange={onNameHandler} required></input>
                                            <input placeholder="ID" value={ID} onChange={onIDHandler} maxLength="20" required></input>
                                            <input type="password" value={Password} onChange={onPasswordHandler} placeholder="PASSWORD" required></input>
                                            <input type="password" value={Password2} onChange={onPassword2Handler} placeholder="CONFIRM PASSWORD" required></input>
                                            <input placeholder="E-mail" value={Email} onChange={onEmailHandler} required></input>
                                            <input type="number" placeholder="PHONE" value={Phone} onChange={onPhoneHandler} required></input>
                                            <button className="joinBtn notEnough" ref={joinBtn} disabled>Join</button>
                                        </div>
                                    </fieldset>
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

export default Join