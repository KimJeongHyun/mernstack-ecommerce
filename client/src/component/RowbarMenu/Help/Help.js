import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'
import { sendMail } from '../../../_actions/user_action'
import axios from 'axios'


function Help(props){
    const [subject,setSubject] = useState('')
    const [text,setText] = useState('')
    const [email,setEmail] = useState('')
    const [attachments,setAttachments] = useState([])

    const dispatch = useDispatch()

    useEffect(() =>{
        
    },[])

    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent">
                            
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        </div>
        
    )
}

export default Help