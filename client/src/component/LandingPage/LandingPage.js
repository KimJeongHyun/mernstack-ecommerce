import React,{useEffect,useState} from 'react'
import { NavSideBar } from '../NavBar/NavSideBar'

import '../../css/style.css'
import axios from 'axios'

function LandingPage(props){
    return(
        <>
        <NavSideBar/>
        <div className="contentArea">
            <img src="images/Coor.jpg"></img>
        </div>
        </>
        
    )
}

export default LandingPage