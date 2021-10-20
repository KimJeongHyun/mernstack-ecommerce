import React, {useState,useRef,useEffect} from 'react'
import { NavSideBar } from '../NavBar/NavSideBar'
import {gsap} from 'gsap'
import {NavBar} from '../NavBar/NavBar'

import '../../css/style.css'

function NewLandingPage(props){

    const [boxReady,setBoxReady] = useState(false)

    const boxRef = useRef();
    const textRef = useRef();
    const videoURL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'

    useEffect(async ()=>{
        await gsap.to(boxRef.current,{opacity:0.7,duration:1})
        setBoxReady(true)
    },[])

    useEffect(async()=>{
        if (boxReady){
            gsap.to(textRef.current,{left:'15%',opacity:1,duration:3})
        }
    },[boxReady])

    return(
        <>
        <div className="contentArea" >
            <div>
                <video id="background-video" loop autoPlay muted>
                    <source src={videoURL} type="video/mp4"/>    
                </video>
            </div>
            <div id="videoWrapping" ref={boxRef}>
                
            </div>
            <div style={{width:'100%',height:'500px', backgroundColor:'red'}}>
                hi!
            </div>
            <div style={{width:'100%',height:'500px', backgroundColor:'red'}}>
                hi!
            </div>
            <div style={{width:'100%',height:'500px', backgroundColor:'red'}}>
                hi!
            </div>
            
        </div>
        </>
        
    )
}


export default NewLandingPage