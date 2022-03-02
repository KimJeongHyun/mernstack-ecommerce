import React,{useState,useEffect,useRef} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {gsap} from 'gsap'

export function NavBar(props){

    const [scrollY,setScrollY] = useState(0);

    const rowBarRef = useRef();

    const onLogout = () =>{
        axios.get("/api/logout")
        .then(response=>{
            alert('로그아웃 되었습니다.');
            window.location.href='/';
        })
    }

    const handleScrollY = () =>{
        if (scrollY>window.scrollY){
            gsap.to('.rowBar',{height:'35', opacity:'1'})
        }else{
            gsap.to('.rowBar',{height:'0',opacity:'0'})
        }
        setScrollY(window.scrollY);
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


    useEffect(()=>{
        const getSession = () =>{
            let len='';
            axios.get('/api/getSession')
            .then(response=>{
                len = response.data.length;
                
                if (len===0){
                    const guestRendering = () =>{
                        const result = [];
                        result.push(
                            <nav>
                                <ul className="rowBar">
                                    <li>
                                        <a href="/Login">LOGIN</a>
                                    </li>
                                    <li>
                                        <a href="/Join">JOIN</a>
                                    </li>
                                    <li>
                                        <a href="/QnA">Q&amp;A</a>
                                    </li>
                                    <li>
                                        <a href="/Review">REVIEW</a>
                                    </li>
                                    <li>
                                        <a href="/Notice">NOTICE</a>
                                    </li>
                                    <li>
                                        <a href="/HelpDesk">HELP</a>
                                    </li>
                                </ul>
                            </nav>
                        )
                        return result;
                    }
                    ReactDOM.render(guestRendering(),rowBarRef.current)
                }else if (response.data.ID!=='admin'){
                    const userRendering = () =>{
                        const result = [];
                        result.push(
                            <nav>
                                <ul className="rowBar">
                                    <li>
                                        <a href="#!" onClick={onLogout} style={{cursor:'pointer'}}>LOGOUT</a>
                                    </li>
                                    <li>
                                        <a href="/MyPage">MY PAGE</a>
                                    </li>
                                    <li>
                                        <a href="/Cart">SHOPPING BAG</a>
                                    </li>
                                    <li>
                                        <a href="/QnA">Q&amp;A</a>
                                    </li>
                                    <li>
                                        <a href="/Review">REVIEW</a>
                                    </li>
                                    <li>
                                        <a href="/Notice">NOTICE</a>
                                    </li>
                                    <li>
                                        <a href="/HelpDesk">HELP</a>
                                    </li>
                                </ul>
                            </nav>
                        )
                        return result;
                    }
                    ReactDOM.render(userRendering(),rowBarRef.current)
                }else if(response.data.ID==='admin'){
                    const adminRendering = () =>{
                        const result = [];
                        result.push(
                            <nav>
                                <ul className="rowBar">
                                    <li>
                                        <a href="#!" onClick={onLogout} style={{cursor:'pointer'}}>LOGOUT</a>
                                    </li>
                                    <li>
                                        <a href="/QnA">Q&amp;A</a>
                                    </li>
                                    <li>
                                        <a href="/Review">REVIEW</a>
                                    </li>
                                    <li>
                                        <a href="/Notice">NOTICE</a>
                                    </li>
                                    <li>
                                        <a href="/#!">MANAGE</a>
                                    </li>
                                </ul>
                            </nav>
                        )
                        return result;
                    }
                    ReactDOM.render(adminRendering(),rowBarRef.current)
                }
            })
        }
        getSession();
    },[])


    return(
        <div className="rowBarContainer" ref={rowBarRef}>
            
        </div>
    )
}