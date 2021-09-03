import React,{useEffect,useRef,useState} from 'react'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../NavBar/NavSideBar'
import '../../css/style.css'
import { NavBar } from '../NavBar/NavBar'

function Store(props){
    const [rendered, setRendered] = useState(false);

    useEffect(()=>{
        const mainRendering = () =>{
            const result=[];
            result.push(
                <>
                    <NavSideBar/>
                    <div className="uxArea">
                        <NavBar/>
                        <div className="uxContent">

                        </div>
                    </div>
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
            storeID.after(list);
        }
    },[rendered])

    return(
        <div id='container'>
        
        </div>
        
    )
}

export default Store