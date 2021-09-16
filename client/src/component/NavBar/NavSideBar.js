import React,{useEffect} from 'react'


export function NavSideBar(){
    return(
        <div>
            <div id="commerceTitle">
                <h1><a href="/">koor</a></h1>
            </div>
            
            
            <nav>
                <ul className="sideBar">
                    <li id="commerceAboutID">
                        <a href="/About" id="commerceAbout">About us</a>
                    </li>
                    <li id="commerceStoreID">
                        <a href="/Store/1" id="commerceStore">Store</a>
                    </li>
                    <li id="commerceCollectionID">
                        <a href="#" id="commerceCollection">Collection</a>
                    </li>
                    <li id="commerceContactID">
                        <a href="#" id="commerceContact">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}