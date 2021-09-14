import React,{useEffect,useRef,useState} from 'react'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../NavBar/NavSideBar'
import '../../css/style.css'
import { NavBar } from '../NavBar/NavBar'
import {Footer} from '../Footer/Footer'

function Store(props){
    const [rendered, setRendered] = useState(false);

    useEffect(()=>{
        const mainRendering = () =>{
            const result=[];
            result.push(
                <>
                    <NavSideBar/>
                    <NavBar/>
                    <div className="uxArea">
                        <div className="contentContainer">
                            <div className="uxContent" style={{paddingTop:'20px', height:'1000px'}}>
                                <table className="storeGrid">
                                    <tr>
                                        <td>
                                            <a href="/ProductDetail"><img src="/images/jacket.jpg"/></a>
                                            <a href="/ProductDetail"><p className="itemName">미니멀 트러커 자켓(Brown)</p></a>
                                            <a href="/ProductDetail"><span className="itemPrice">100,000원</span></a>
                                        </td>
                                        <td>
                                            <img src="/images/jacket.jpg"/>
                                            <p className="itemName">미니멀 트러커 자켓(Brown)</p>
                                            <span className="itemPrice">100,000원</span>
                                        </td>
                                        <td>
                                            <img src="/images/jacket.jpg"/>
                                            <p className="itemName">미니멀 트러커 자켓(Brown)</p>
                                            <span className="itemPrice">100,000원</span>
                                        </td>
                                        <td>
                                            <img src="/images/jacket.jpg"/>
                                            <p className="itemName">미니멀 트러커 자켓(Brown)</p>
                                            <span className="itemPrice">100,000원</span>
                                        </td>
                                        <td>
                                            <img src="/images/jacket.jpg"/>
                                            <p className="itemName">미니멀 트러커 자켓(Brown)</p>
                                            <span className="itemPrice">100,000원</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="/images/jacket.jpg"/>
                                            <p className="itemName">미니멀 트러커 자켓(Brown)</p>
                                            <span className="itemPrice">100,000원</span>
                                        </td>
                                        <td>
                                            <img src="/images/jacket.jpg"/>
                                            <p className="itemName">미니멀 트러커 자켓(Brown)</p>
                                            <span className="itemPrice">100,000원</span>
                                        </td>
                                        <td>
                                            <img src="/images/jacket.jpg"/>
                                            <p className="itemName">미니멀 트러커 자켓(Brown)</p>
                                            <span className="itemPrice">100,000원</span>
                                        </td>
                                        <td>
                                            <img src="/images/jacket.jpg"/>
                                            <p className="itemName">미니멀 트러커 자켓(Brown)</p>
                                            <span className="itemPrice">100,000원</span>
                                        </td>
                                        <td>
                                            <img src="/images/jacket.jpg"/>
                                            <p className="itemName">미니멀 트러커 자켓(Brown)</p>
                                            <span className="itemPrice">100,000원</span>
                                        </td>
                                    </tr>

                                </table>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </>
            )
            return result;

        }
        ReactDOM.render(mainRendering(),document.getElementById('container'))
        setRendered(true);
    },[])

    useEffect(()=>{
        const storeID = document.getElementById('commerceStoreID');
        if (storeID!=null){
            const list = document.createElement('li');
            list.className='sub';
            const a = document.createElement('a');
            a.href='#'
            const textNode = document.createTextNode('Arrival');
            a.appendChild(textNode);
            list.appendChild(a);    
            
            // Arrival List

            const list2 = document.createElement('li');
            list2.className='sub';
            const a2 = document.createElement('a');
            a2.href='#'
            const textNode2 = document.createTextNode('2021 F / W');
            a2.appendChild(textNode2);
            list2.appendChild(a2);

            // 2021 F / W

            storeID.after(list2);
            storeID.after(list);
            
            
        }
    },[rendered])

    return(
        <div id='container'>
        
        </div>
        
    )
}

export default Store