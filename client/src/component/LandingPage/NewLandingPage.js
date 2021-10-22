import React, {useState,useRef,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {gsap} from 'gsap'
import { NewNavBar } from '../NavBar/NewNavBar'
import { getClothes } from '../../_actions/user_action'

import '../../css/style.css'
import TopBtn from '../TopBtn/TopBtn'

function NewLandingPage(props){


    const [clothMap,setClothMap] = useState([]);
    const [imgLoc, setImgLoc] = useState(2)
    const [slideReady,setSlideReady] = useState(false);
    const [slideInterval, setSlideInterval] = useState('');

    const dispatch = useDispatch();

    const boxRef = useRef();
    const textRef = useRef();
    const textRef2 = useRef();
    const textRef3 = useRef();
    const imageRef = useRef();

    const videoURL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'

    useEffect(()=>{
        const worker = async () =>{
            await dispatch(getClothes())
            .then(response=>{
                let clothList = [];
                for (let i=2; i<response.payload.length+2; i++){
                    clothList.push(response.payload.clothesMap[i].clothImgPath)
                }
                setClothMap(clothList);
            })

            await gsap.to(boxRef.current,{opacity:0.7,duration:1})
            await gsap.to(textRef.current,{top:'25%',duration:1})
            await gsap.to(textRef2.current,{opacity:1,duration:1})
            await gsap.to(textRef3.current,{opacity:1,duration:1})
            await gsap.to('.wrappingText',{right:'20%',duration:1})
            await gsap.to('.wrappingImage',{opacity:1})
            setSlideReady(true)
            setSlideInterval(()=>{

            })
        }
        worker();
        
    },[])

    useEffect(()=>{

        if (slideReady){
            function tick(){
                if (imgLoc+1<=clothMap.length){
                    return setTimeout(()=>setImgLoc(imgLoc+1),1000)
                }else{
                    return setTimeout(()=>setImgLoc(2),1000)
                }
                
            }
            tick();
            return ()=>clearTimeout(tick);
        }
    },[slideReady,imgLoc])

    const productDetail = (event) =>{
        event.preventDefault();
        
    }

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
            </div>
            <div id="wrappingImageArea" className="wrappingImage">
                <div id="imageArea" className="imageMap" ref={imageRef}>
                    {clothMap.map((img,i)=> 
                    <img src={img} key={i} style={{width:'100%', height:'100%'}} onClick={productDetail}/>
                    )}
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