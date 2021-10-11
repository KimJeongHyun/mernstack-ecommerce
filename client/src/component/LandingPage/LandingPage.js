import React from 'react'
import { NavSideBar } from '../NavBar/NavSideBar'

import '../../css/style.css'


function LandingPage(props){
    return(
        <>
        <NavSideBar/>
        <div className="contentArea">
            <img src="images/Coor.jpg" alt="Initial View"></img>
        </div>
        </>
        
    )
}

export default LandingPage