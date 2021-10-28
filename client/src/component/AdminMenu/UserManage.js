import {BsArrowLeftCircleFill} from 'react-icons/bs'
import {gsap} from 'gsap'

function UserManage(){
    const textFloating = (event) =>{
        event.preventDefault();
        gsap.to('#backToText',{opacity:1, top:'-4px'})
    }
    const textHiding = (event) =>{
        event.preventDefault();
        gsap.to('#backToText',{opacity:0, top:'10px'})
    }
    const backToAdmin = (event) =>{
        event.preventDefault();
        const work = async () =>{
            await gsap.to('.adminMenuDivContainer',{opacity:0,display:'none'})
            await gsap.to('.adminArea',{opacity:1,width:'100%',display:'block'})
        }
        work();
    }


    return(
        <div className='adminMenuDivContainer'>
            <div className='adminMenuDiv'>
                asdfasdf
            </div>
            <div className='backToAdminMenus'>
                <BsArrowLeftCircleFill id='backArrow' onClick={backToAdmin} onMouseOver={textFloating} onMouseOut={textHiding}/> 
                <span id='backToText'>
                    Back to Admin menus
                </span>
            </div>
        </div>
    )
}

export default UserManage