import React, {useState,useRef,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {gsap} from 'gsap'
import { NewNavBar } from '../NavBar/NewNavBar'
import { getClothes } from '../../_actions/user_action'
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from 'react-icons/bs'


import '../../css/style.css'
import TopBtn from '../TopBtn/TopBtn'

function NewLandingPage(props){


    const [clothMap,setClothMap] = useState([]);
    const [imgLoc, setImgLoc] = useState(2)
    const [slideReady,setSlideReady] = useState(false);

    const dispatch = useDispatch();

    const boxRef = useRef();
    const textRef = useRef();
    const textRef2 = useRef();
    const textRef3 = useRef();
    const imageRef = useRef();
    const tickRef = useRef();

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
            if (document.getElementById('preventOnClick')!==null){
                document.getElementById('preventOnClick').remove();
            }
            setSlideReady(true)
        }
        worker();
        
    },[])
    /*const tick = () =>{
            return setTimeout(()=>{
                if (imageRef.current!=null){
                    imgLoc+1<=clothMap.length ? setImgLoc(imgLoc+1) : setImgLoc(2)
                }
                
            },4000)
        }
        tick()
        clearTimeout(tick)
    }*/
    useEffect(()=>{
        if (slideReady){
            clearInterval(tickRef.current)
            tickRef.current = setInterval(()=>{
                if (imageRef.current!=null){
                    imgLoc+1<=clothMap.length ? setImgLoc(imgLoc+1) : setImgLoc(2)
                }
                
            },4000)
            
            
            return ()=>clearInterval(tickRef.current);
        }
    },[slideReady,imgLoc])

    const productDetail = (event) =>{
        event.preventDefault();
        clearInterval(tickRef.current);
        props.history.push({
            pathname:"/ProductDetail/"+imgLoc
        })
    }

    const buttonAppear = (event) =>{
        event.preventDefault();
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        gsap.to(prevBtn,{opacity:1})
        gsap.to(nextBtn,{opacity:1})
    }

    const buttonDisappear = (event) =>{
        event.preventDefault();
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        gsap.to(prevBtn,{opacity:0})
        gsap.to(nextBtn,{opacity:0})
    }

    const nextBtnClick = (event) =>{
        event.preventDefault();
        clearInterval(tickRef.current);
        if (imgLoc+1<=clothMap.length){
                setImgLoc(imgLoc+1)
        }else{
            setImgLoc(2)
        }
    }

    const prevBtnClick = (event) =>{
        event.preventDefault();
        clearInterval(tickRef.current);
        if (imgLoc-1>=2){
                setImgLoc(imgLoc-1)
        }else{
            setImgLoc(clothMap.length)
        }
    }

    const btnUnderline = (event) =>{
        event.preventDefault();
        document.getElementById('underline').style.opacity='1';
        document.getElementById('underline').style.width='100%';
    }

    const btnUnderlineHide = (event) =>{
        event.preventDefault();
        document.getElementById('underline').style.width='0';
        document.getElementById('underline').style.opacity='0';
    }

    return(
        <>
        <div className="contentArea" >
            <NewNavBar/>
            <div>
                <video id="background-video" loop autoPlay muted>
                    <source src={videoURL} type="video/mp4"/>    
                </video>
            </div>
            <div id="textWrapping" ref={boxRef}>
                <div id="wrappingTextArea1" className='wrappingText' ref={textRef}>
                    Empha ː vation
                </div>
                <div id="wrappingTextArea2" className='wrappingText' ref={textRef2}>
                   【 공감에서 이어지는 ː 새로운 영감 】
                </div>
                <div id="wrappingTextArea3" className='wrappingText' ref={textRef3}>
                    <p>Feeling empathy on your life</p>
                </div>
            </div>
            <div id="preventOnClick">

            </div>
            <div id="wrappingImageArea" className="wrappingImage" onMouseEnter={buttonAppear} onMouseLeave={buttonDisappear}>
                <div id="imageArea" className="imageMap" ref={imageRef} style={{transform:`translateX(-${imgLoc-2}00%)`}}>
                    {clothMap.map((img,i)=> 
                    <img src={img} key={i} style={{width:'100%',height:'auto'}} onClick={productDetail}/>
                    )}
                </div>
                <BsFillArrowLeftSquareFill id="prevBtn" style={{cursor:'pointer'}} onClick={prevBtnClick}/>
                <BsFillArrowRightSquareFill id="nextBtn" style={{cursor:'pointer'}} onClick={nextBtnClick}/>
            </div>
            <div id="landingAboutUs" style={{overflow:'hidden'}}>
                <div id='aboutUsImageArea'>
                    
                </div>
                <div id='aboutUsContent'>
                    <span id='aboutUsHeader'>
                        <p>Easy Lifestyle</p>
                        <p>For Your Personality</p>
                    </span>
                    <div id='aboutUsBody'>
                        
                    </div>
                    <span id='StoreBtn' onMouseOver={btnUnderline} onMouseOut={btnUnderlineHide}><a id='StoreBtnA' href='/Store/1'>Go to Store</a></span>
                    <hr id='underline'/>
                </div>
            </div>
            <div id="landingFooter">
                
            </div>
            <TopBtn/>
        </div>
        </>
    )
}


export default NewLandingPage