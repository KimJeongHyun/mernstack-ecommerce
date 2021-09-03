import React,{useEffect,useRef,useState} from 'react'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../NavBar/NavSideBar'
import '../../css/style.css'
import { NavBar } from '../NavBar/NavBar'

function LandingPage(props){
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
        const aboutID = document.getElementById('commerceAboutID');
        if (aboutID!=null){
            const list = document.createElement('li');
            list.className='sub';
            const a = document.createElement('a');
            a.href='#'
            const textNode = document.createTextNode('Map');
            a.appendChild(textNode);
            list.appendChild(a);
            aboutID.after(list);
        }
    },[rendered])

    return(
        <div id='container'>
        
        </div>
        
    )
}

export default LandingPage