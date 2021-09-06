import React,{useEffect,useRef,useState} from 'react'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../NavBar/NavSideBar'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import '../../css/style.css'



function CheckPw(props){

    const [clientID, setClientID] = useState("ID");
    
    const onSetClientID = () => {
        setClientID('ID');
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
                                <form className="inputForm">
                                    <fieldset style={{border:'none'}}>
                                        <legend style={{visibility:'hidden'}}>Check Pw</legend>
                                        <div>
                                            <p>We confirm your password for protect your personal information</p>
                                            <p>and prevent take a hit by aggresive activities.</p>
                                            <p>Please re-confirm your password.</p>
                                        </div>
                                        <br/>
                                        <input placeholder="ID" value={clientID} readOnly/>
                                        <br/>
                                        <input type="password" placeholder="PASSWORD"></input>
                                        <br/>
                                        <button style={{width:'100px', marginRight:'10px'}}>Confirm</button>
                                        <button style={{width:'100px'}}><a href="/" style={{textDecoration:'none', color:'#fff'}}>Cancel</a></button>
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

export default CheckPw