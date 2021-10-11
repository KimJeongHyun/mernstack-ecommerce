import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'



function Login(props){

    const dispatch = useDispatch();

    const [ID, setID] = useState("")
    const [Password,setPassword] = useState("")


    const onIDHandler = (event) =>{
        setID(event.target.value);
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.target.value);
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();

        let body={
            ID:ID,
            Password:Password
        }

        dispatch(loginUser(body))
        .then(response=>{
            if(response.payload.loginSuccess){
                alert('반갑습니다 ' + ID + '님!')
                props.history.push({
                    pathname:"/"
                })
            }else{
                alert('없는 아이디이거나 비밀번호가 일치하지 않습니다.')
                props.history.push({
                    pathname:"/login"
                })
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
                        <div className="uxContent">
                            <div className="inputDiv">
                                <form className="inputForm" onSubmit={onSubmitHandler}>
                                    <fieldset style={{border:'none'}}>
                                        <legend style={{visibility:'hidden'}}>Login Form</legend>
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <input placeholder="ID" maxLength="20" value={ID} onChange={onIDHandler}></input>
                                            <input type="password" placeholder="PASSWORD" value={Password} onChange={onPasswordHandler}></input>
                                            <a href="{()=>false}">Forgot?</a>
                                            <a href="{()=>false}">Join Us</a>
                                            <button>Login</button>
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

export default Login