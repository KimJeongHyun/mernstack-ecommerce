import React,{useEffect,useState} from 'react'
import {gsap} from 'gsap'

export function NewNavBar(props){

    const [scrollY,setScrollY] = useState(0);
    
    const handleScrollY = () =>{
        setScrollY(window.scrollY);
        if (scrollY<window.outerHeight){
            gsap.to('.newRowBar li a', {color:'white'})
            
        }else{
            gsap.to('.newRowBar li a',{color:'black'})
            const tl = gsap.timeline();
            tl.add('start')
            .to('#aboutUsImageArea',{width:'150%',duration:'1.2'},'start')
            .to('#aboutUsHeader',{bottom:'60px',duration:'1.2'},'start')
            .to('#StoreBtnA',{marginTop:'250px',duration:'1.2'},'start')
            .to('#aboutUsHeader',{opacity:'1',autoAlpha:'1',duration:'1.2'},'start')
            .to('#StoreBtnA',{opacity:'1',autoAlpha:'1', duration:'1.2'},'start')
            .to('#aboutUsBody',{opacity:'1',display:'block',autoAlpha:'1'})
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

    const scrollToAbout = () =>{
        const aboutUsRef = document.getElementById('landingAboutUs');
        aboutUsRef.scrollIntoView({ behavior: 'smooth' })
    }

    return(
        <div className="newRowBarContainer">
            <nav>
                <div className="mainLogo">
                    <img src='./images/sympst.png' alt='logoImage'></img>
                </div>
                <ul className="newRowBar">
                    <li>
                        <a id='rowbarA' href="/Main">MAIN</a>
                    </li>
                    <li>
                        <a id='rowbarA' href="/#!" onClick={scrollToAbout}>ABOUT US</a>
                    </li>
                    <li>
                        <a id='rowbarA' href="/HelpDesk">HELP</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}