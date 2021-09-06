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
                        <a href="#">MY PAGE</a>
                    </li>
                    <li>
                        <a href="/Cart">SHOPPING BAG</a>
                    </li>
                    <li>
                        <a href="#">Q&amp;A</a>
                    </li>
                    <li>
                        <a href="#">REVIEW</a>
                    </li>
                    <li>
                        <a href="#">NOTICE</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}