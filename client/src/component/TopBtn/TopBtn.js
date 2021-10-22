import React,{useState,useEffect} from 'react'
import {gsap} from 'gsap'
import {BsFillArrowUpSquareFill} from 'react-icons/bs'
function TopBtn(){

    const [scrollY,setScrollY] = useState(0);
    
    const handleScrollY = () =>{
        setScrollY(window.scrollY);
        if (scrollY>window.outerHeight){
            gsap.to('.TopBtn',{opacity:1})
        }
        if (scrollY<window.outerHeight){
            gsap.to('.TopBtn',{opacity:0})
        }
    }

    useEffect(()=>{
        const watch = () =>{
            window.addEventListener('scroll',handleScrollY)
        }
        watch();
        return () =>{
            window.removeEventListener('scroll',handleScrollY)
        }
    })

    const scrollTop = () =>{
        const root = document.getElementById('root');
        root.scrollIntoView({ behavior: 'smooth' })
    }

    return(
        <>
            <div className='TopBtn'>
                <BsFillArrowUpSquareFill style={{width:'60px', height:'60px', cursor:'pointer'}} onClick={scrollTop}/>
            </div>
        </>

    )
}

export default TopBtn