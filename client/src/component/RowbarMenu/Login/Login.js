import React,{useEffect,useRef,useState} from 'react'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'



function Login(props){
    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent">
                            <div className="loginDiv">
                                <form className="loginForm">
                                    <fieldset style={{border:'none'}}>
                                        <legend style={{visibility:'hidden'}}>Login Form</legend>
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <input placeholder="ID" maxLength="20"></input>
                                            <input type="password" placeholder="PASSWORD"></input>
                                            <a href="#">Forgot?</a>
                                            <a href="#">Join Us</a>
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