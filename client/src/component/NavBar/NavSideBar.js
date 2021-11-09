import React, {useState, useEffect} from 'react'
import { gsap } from 'gsap';

export function NavSideBar(){
    const [scrollY,setScrollY] = useState(0);
    
    const handleScrollY = () =>{
        if (window.location.pathname=='/Main'){
            setScrollY(window.scrollY);
            if (scrollY<window.outerHeight-340){
                gsap.to('#sidebarA', {color:'white'})
                
            }
            
            if (scrollY>window.outerHeight-340){
                gsap.to('#sidebarA', {color:'black'})
            }
        }
        
    }
    useEffect(()=>{
        if (window.location.pathname!=='/Main'){
            const sideA = document.getElementsByName('sidebarA')
            for (let i=0; i<sideA.length; i++){
                sideA[i].style.color='black'
            }
        }
    })

    useEffect(()=>{
        
        const watch = () =>{
            window.addEventListener('scroll',handleScrollY)
        }
        watch();
        return () =>{
            window.removeEventListener('scroll',handleScrollY)
        }
    })


    return(
        <div>
            <div id="commerceTitle">
                <h1><a href="/"><img src='../images/sympst.png'></img></a></h1>
            </div>
            <nav>
                <ul className="sideBar">
                    <li id="commerceAboutID">
                        <a href="/About" name='sidebarA' id="sidebarA">About us</a>
                    </li>
                    <li id="commerceStoreID">
                        <a href="/Store/1" name='sidebarA' id="sidebarA">Store</a>
                    </li>
                    <li id="commerceCollectionID">
                        <a href="#!" name='sidebarA' id="sidebarA">Collection</a>
                    </li>
                    <li id="commerceContactID">
                        <a href="#!" name='sidebarA' id="sidebarA">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}