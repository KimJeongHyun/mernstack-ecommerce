import React,{useEffect,useRef} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export function NavBar(props){

    const rowBarRef = useRef();

    const onLogout = () =>{
        axios.get("/api/logout")
        .then(response=>{
            alert('로그아웃 되었습니다.');
            window.location.href='/';
        })
    }


    useEffect(()=>{

        const getSession = () =>{
            let len='';
            axios.get('/api/getSession')
            .then(response=>{
                len = response.data.length;
                if (len==0){
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
                                </ul>
                            </nav>
                        )
                        return result;
                    }
                    ReactDOM.render(guestRendering(),rowBarRef.current)
                }else{
                    const userRendering = () =>{
                        const result = [];
                        result.push(
                            <nav>
                                <ul className="rowBar">
                                    <li>
                                        <a onClick={onLogout} style={{cursor:'pointer'}}>LOGOUT</a>
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
                                </ul>
                            </nav>
                        )
                        return result;
                    }
                    ReactDOM.render(userRendering(),rowBarRef.current)
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