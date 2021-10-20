import React, {useState,useRef,useEffect} from 'react'
import {gsap} from 'gsap'
import { NewNavBar } from '../NavBar/NewNavBar'

import '../../css/style.css'
import TopBtn from '../TopBtn/TopBtn'

function NewLandingPage(props){

    const [boxReady,setBoxReady] = useState(false)

    const boxRef = useRef();
    const textRef = useRef();
    const textRef2 = useRef();
    const textRef3 = useRef();

    const videoURL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'

    useEffect(()=>{
        gsap.to(boxRef.current,{opacity:0.7,duration:1})
        setBoxReady(true)
    },[])

    useEffect(()=>{
        if (boxReady){
            async function worker(){
                await gsap.to(textRef.current,{top:'25%',duration:1})
                await gsap.to(textRef2.current,{opacity:1,duration:1})
                await gsap.to(textRef3.current,{opacity:1,duration:1})
                await gsap.to('.wrappingText',{right:'20%',duration:1})
                await gsap.to('.wrappingImage',{opacity:1})
            }
            worker();
        }
    },[boxReady])

    return(
        <>
        <div className="contentArea" >
            <NewNavBar id='newNavBar'/>
            <div>
                <video id="background-video" loop autoPlay muted>
                    <source src={videoURL} type="video/mp4"/>    
                </video>
            </div>
            <div id="videoWrapping" ref={boxRef}>
                <div id="wrappingTextArea1" className='wrappingText' ref={textRef}>
                    Empa : vation
                </div>
                <div id="wrappingTextArea2" className='wrappingText' ref={textRef2}>
                   【 공감에서 이어지는 : 새로운 영감 】
                </div>
                <div id="wrappingTextArea3" className='wrappingText' ref={textRef3}>
                    <p>Feeling empathy on your life</p>
                </div>
                <div id="wrappingImageArea" className="wrappingImage">
                    {/* image slide area*/}
                </div>
            </div>
            <div id="landingAboutUs">
                
            </div>
            <TopBtn/>
        </div>
        </>
        
    )
}


export default NewLandingPage