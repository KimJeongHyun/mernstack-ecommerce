import React,{useEffect} from 'react'


export function NavBar(){
    return(
        <div className="rowBarContainer">
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
        </div>
    )
}