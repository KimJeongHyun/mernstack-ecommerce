import React,{useEffect,useRef,useState} from 'react'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'



function Join(props){
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
                                        <legend style={{visibility:'hidden'}}>Join Form</legend>
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <input placeholder="NAME" required></input>
                                            <input placeholder="ID" maxLength="20" required></input>
                                            <input type="password" placeholder="PASSWORD" required></input>
                                            <input type="password" placeholder="CONFIRM PASSWORD" required></input>
                                            <input placeholder="E-mail" required></input>
                                            <input placeholder="PHONE" required></input>
                                            
                                            <button>Join</button>
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