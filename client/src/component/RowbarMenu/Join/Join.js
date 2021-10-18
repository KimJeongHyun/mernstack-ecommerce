import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'


function Join(props){

    const joinBtn = useRef();

    const dispatch = useDispatch();

    const [Name,setName] = useState("")
    const [ID, setID] = useState("")
    const [Password,setPassword] = useState("")
    const [Password2,setPassword2] = useState("")
    const [Email,setEmail] = useState("")
    const [Phone,setPhone] = useState("")


    const onValueHandler = (event) =>{
        event.preventDefault();
        const {name,value} = event.target;
        switch (name){
            case 'name':
                setName(value)
                break;
            case 'id':
                setID(value)
                break;
            case 'pw':
                setPassword(value)
                break;
            case 'pw2':
                setPassword2(value)
                break;
            case 'email':
                setEmail(value)
                break;
            case 'phone':
                if (event.target.value.length<=11){
                    setPhone(event.target.value);
                }
                break;
        }
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();

        if (Phone.length<11){
            alert('핸드폰 번호를 정확히 입력해주시기 바랍니다.')
        }

        let body={
            Name:Name,
            ID:ID,
            Password:Password,
            Password2:Password2,
            Email:Email,
            Phone:Phone
        }
        dispatch(registerUser(body))
        .then(response=>{
            if (response.payload.registerSuccess){
                alert('환영합니다!')
                props.history.push({
                    pathname:"/"
                })
            }else{
                alert('이미 등록된 아이디입니다.')
                props.history.push({
                    pathname:"/Join"
                })
            }
        })
    }

    useEffect(()=>{
        if (Name!=='' && ID!=='' && Password!=='' && Password2!=='' && Email!=='' && Phone!==''){
            if (Phone.length===11 && Email.includes('@')){
                joinBtn.current.classList.remove('notEnough');
                joinBtn.current.removeAttribute('disabled');
            }
            
        }

        if (Name==='' || ID==='' || Password==='' || Password2==='' || Email==='' || Phone===''){
            joinBtn.current.classList.add('notEnough');
            joinBtn.current.setAttribute('disabled',true);
        }


    },[Name,ID,Password,Password2,Email,Phone])

    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent">
                            <div className="inputDiv">
                                <form className="inputForm" onSubmit={onSubmitHandler}>
                                    <fieldset style={{border:'none'}}>
                                        <legend style={{visibility:'hidden'}}>Join Form</legend>
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <input placeholder="NAME" value={Name} name='name' onChange={onValueHandler} required></input>
                                            <input placeholder="ID" value={ID} name='id' onChange={onValueHandler} maxLength="20" required></input>
                                            <input type="password" value={Password} name='pw' onChange={onValueHandler} placeholder="PASSWORD" required></input>
                                            <input type="password" value={Password2} name='pw2' onChange={onValueHandler} placeholder="CONFIRM PASSWORD" required></input>
                                            <input placeholder="E-mail" value={Email} name='email' onChange={onValueHandler} required></input>
                                            <input type="number" placeholder="PHONE" value={Phone} name='phone' onChange={onValueHandler} required></input>
                                            <button className="joinBtn notEnough" ref={joinBtn} disabled>Join</button>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        </div>
        
    )
}

export default Join