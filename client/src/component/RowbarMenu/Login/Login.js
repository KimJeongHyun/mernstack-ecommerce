import React,{useEffect,useState} from 'react'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import '../../../css/style.css'


function Login(props){
    return(
        <>
        <NavSideBar/>
        <div className="uxArea">
            <NavBar/>
            <div className="uxContent">
                hi
            </div>
        </div>
        </>
        
    )
}

export default Login