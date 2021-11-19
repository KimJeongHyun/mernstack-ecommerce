import React,{useEffect,useState} from 'react'
import { gsap } from 'gsap'
import DBInsert from '../AdminMenu/DBInsert'
import UserManage from '../AdminMenu/UserManage'
import RefundManage from '../AdminMenu/RefundManage'
import '../../css/adminStyle.css'

function AdminLandingPage(){

    const [selContent,setSelContent] = useState('')

    const metaTag = document.createElement('meta');
    metaTag.name='viewport';
    metaTag.contenr = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
    document.getElementsByTagName('head')[0].appendChild(metaTag);

    const mouseOverFunc = (event) =>{
        event.preventDefault();
        event.target.classList.add('active')
        gsap.to(event.target.querySelector('#buttonArea'),{top:'30%'})
        
    }

    const mouseLeaveFunc = (event) =>{
        event.preventDefault();
        event.target.classList.remove('active')
        gsap.to(event.target.querySelector('#buttonArea'),{top:'40%'})
    }

    const containerFold = async (event) =>{
        event.preventDefault();
        await gsap.to('.adminArea',{width:'0%', display:'none'})
        const work1 = () =>{
            switch(event.target.className){
                case 'content1':
                    setSelContent('DBInsert')
                break
                case 'content2':
                    setSelContent('UserManage')
                break
                case 'content3':
                    setSelContent('ETC')
                break
            }
        }
        await work1();
        await gsap.to('.adminMenu, .adminMenuDiv',{autoAlpha:'1',display:'block', duration:0.5})
    }

    const adminMenuRendering = () =>{
        switch(selContent){
            case 'DBInsert':
                return <DBInsert/>
            case 'UserManage':
                return <UserManage/>
            case 'ETC': 
                return <RefundManage/>
            default:
                return 
        }
    }
    return(
        <>
        <div className='adminArea'>
            <div className='contentWrapper'>
                <div className='content1' 
                    onMouseOver={mouseOverFunc} 
                    onMouseLeave={mouseLeaveFunc}  
                    onClick={containerFold}>

                    <div id='buttonArea'>
                        <span>Product Update</span>
                    </div>
                </div>
                <div className='content2' 
                    onMouseOver={mouseOverFunc} 
                    onMouseLeave={mouseLeaveFunc}  
                    onClick={containerFold}>

                    <div id='buttonArea'>
                        <span>User Management</span>
                    </div>
                </div>
                <div className='content3' 
                    onMouseOver={mouseOverFunc} 
                    onMouseLeave={mouseLeaveFunc}  
                    onClick={containerFold}>

                    <div id='buttonArea'>
                        <span>Refund Manage</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='adminMenu'>
            {adminMenuRendering()}
        </div>
        </>
    )
}

export default AdminLandingPage;