import React, {useState,useRef,useEffect} from 'react'
import { NavSideBar } from '../NavBar/NavSideBar'
import {gsap} from 'gsap'

import '../../css/style.css'

function NewLandingPage(props){

    const [boxReady,setBoxReady] = useState(false)

    const boxRef = useRef();
    const textRef = useRef();

    useEffect(async ()=>{
        await gsap.to(boxRef.current,{opacity:1,duration:3})
        setBoxReady(true)
    },[])

    useEffect(async()=>{
        if (boxReady){
            gsap.to(textRef.current,{opacity:1,duration:3})
        }
    },[boxReady])

    return(
        <>
        <div className="contentArea" >
            <img ref={boxRef} style={{opacity:'0'}} src="images/Coor.jpg" alt="Initial View"></img>
            <p ref={textRef} style={{opacity:'0',position:'absolute',left:'25%', bottom:'50%', color:'white'}}> 당신을 위한 최고의 선택 </p>
        </div>
        </>
        
    )
}


export default NewLandingPage