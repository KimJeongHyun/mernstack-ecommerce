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
            document.getElementById('aboutUsImageArea').style.transform='translateX(-8%)'
            
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