import {BsArrowLeftCircleFill} from 'react-icons/bs'
import {gsap} from 'gsap'
import {useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import { getUsers } from '../../_actions/user_action'
import axios from 'axios'

function UserManage(){

    const dispatch = useDispatch()
    const [loadStatus, setLoadStatus] = useState('')
    const [usersMap, setUsersMap] = useState('')
    const [userLength, setUserLength] = useState(0)
    const [checkList , setCheckList] = useState([])

    const [accumReason, setAccumReason] = useState('')
    const [accumValue,setAccumValue] = useState('')

    const [couponReason, setCouponReason] = useState('')
    const [couponVolume, setCouponVolume] = useState(0)
    const [couponDuration, setCouponDuration] = useState('')

    const onValueHandler = (event) =>{
        event.preventDefault();
        const {name,value} = event.target;
        switch(name){
            case 'accumReason':
                setAccumReason(value)
            break;
            case 'accumValue':
                setAccumValue(value)
            break;
            case 'couponReason':
                setCouponReason(value)
            break;
            case 'couponVolume':
                setCouponVolume(value)
            break;
            case 'couponDuration':
                setCouponDuration(value)
            break;
        }
    }

    const pushList = (event) =>{
        const name = event.target.name;
        if (event.target.checked){
            setCheckList(checkList => [...checkList,name])
        }

        if (!event.target.checked){
            setCheckList(checkList => checkList.filter(item=>item!=name))
        }
    }

    const unCheck = (event) =>{
        event.preventDefault();
        const checkBoxes = document.getElementsByClassName('userCheck')
        for (let i = 0; i<checkBoxes.length; i++){
            checkBoxes[i].checked = false;
        }
        setCheckList([]);
    }

    const allCheck = (event) =>{
        event.preventDefault();
        const checkBoxes = document.getElementsByClassName('userCheck')
        let newList = [];
        for (let i = 0; i<checkBoxes.length; i++){
            checkBoxes[i].checked = true;
            newList.push(checkBoxes[i].name)
            setCheckList(newList);
        }
    }
    
    useEffect(() =>{
        console.log(checkList);
    },[checkList])

    const initiate = (name) =>{
        if (name==='accumSVR'){
            setAccumReason('')
            setAccumValue('')
        }

        if (name==='couponSVR'){
            setCouponReason('')
            setCouponVolume('')
            setCouponDuration('')
        }
        
        setCheckList([])
        const checkBoxes = document.getElementsByClassName('userCheck')
        for (let i = 0; i<checkBoxes.length; i++){
            checkBoxes[i].checked = false;
        }
    }

    const onInitiate = (event) =>{
        event.preventDefault();
        let name = event.target.getAttribute('name');

        if (name===null){
            name = event.target.parentElement.getAttribute('name')
        }

        if (name==='accumInitiate'){
            setAccumReason('')
            setAccumValue('')
        }

        if (name==='couponInitiate'){
            setCouponReason('')
            setCouponVolume('')
            setCouponDuration('')
        }
    }

    const onSubmitToSVR = (event) =>{
        event.preventDefault();
        let name = event.target.getAttribute('name');
        if (name===null){
            name=event.target.parentElement.getAttribute('name')
        }

        if (name==='accumSVR'){
            let body = {
                reason : accumReason,
                addAccum : accumValue,
                checkList : checkList
            }

            axios.post('/api/updateAccum',body)
            .then(response=>{
                if (response.data.postSuccess){
                    alert('?????? ??????')
                    initiate(name);
                }else{
                    alert('?????? ????????? ????????? ???????????????.')
                }
            })

        }

        if (name==='couponSVR'){
            let body = {
                reason : couponReason,
                couponVolume : couponVolume,
                couponDuration: couponDuration,
                checkList : checkList
            }
            
            axios.post('/api/addCoupon',body)
            .then(response=>{
                if (response.data.postSuccess){
                    alert('?????? ??????')
                    initiate(name);
                }else{
                    alert('??????. ??? ?????? ????????? ???????????? ?????? ????????? ???????????????.')
                }
            })
        }
    }



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
            await gsap.to('.adminMenu',{autoAlpha:'0',display:'none'})
            await gsap.to('.adminArea',{autoAlpha:'1',width:'100%',display:'block'})
        }
        work();
    }

    

    useEffect(()=>{
        dispatch(getUsers())
        .then(response=>{
            if(response.payload.getUserSuccess){
                setLoadStatus(true)
                setUsersMap(response.payload.usersMap)
                setUserLength(response.payload.length);
            }    
        })
    },[])


    useEffect(()=>{
        if (loadStatus && usersMap!='' &&  userLength!=0){
            const loadComplete = () =>{
                const result = [];
                for (let i=0; i<userLength; i++){
                    result.push(
                            <li key={usersMap[i].seq}>
                                <input 
                                    type='checkbox' id='userCheck' 
                                    className='userCheck'
                                    name={usersMap[i]._id} 
                                    onChange={pushList}
                                />
                                {usersMap[i].userName}
                            </li>
                    )
                }
                ReactDOM.render(result,document.querySelector('#usersList'))
            }
            loadComplete();
        }
    },[loadStatus,usersMap,userLength])

    return(
        <div className='adminMenuDivContainer'>
            <div className='adminMenuDiv'>
                <div className='usersDiv'>
                    <p id='listTitle'>User List</p>
                    <hr className='adminMenuHR'/>
                    <ul id='usersList'>

                    </ul>
                    <div className='PannelContainer' style={{marginTop:'20vh', marginLeft:'1.5vw'}}>
                        <div className = 'initializeBtn' style={{marginBottom:'10px'}} onClick={unCheck}> 
                            <span>?????? ??????</span>
                        </div>
                        <div className = 'initializeBtn' onClick={allCheck}>
                            <span>?????? ??????</span>
                        </div>
                    </div>
                </div>
                <div className='funcDiv'>
                    <div className='accumDiv'>
                        <p id='listTitle'>????????? ??????</p>
                        <hr className='adminMenuHR'/>
                        <table id='adminTable'>
                            <tr id='adminTableTR'>
                                <td>?????? ??????</td>
                                <td>?????? ??????</td>
                            </tr>
                            <tr className='tr2' id='adminTableTR'>
                                <td><input name='accumReason' id='tableName' value={accumReason} onChange={onValueHandler}/></td>
                                <td><input name='accumValue' type='number' id='tableName' value={accumValue} onChange={onValueHandler}/></td>
                            </tr>
                        </table>
                        <div className='PannelContainer' style={{marginTop:'3vh', marginRight:'1.5vw'}}>
                            <div className = 'initializeBtn' name='accumInitiate' style={{marginRight:'10px'}} onClick={onInitiate}> 
                                <span>?????????</span>
                            </div>
                            <div className = 'initializeBtn' name='accumSVR' onClick={onSubmitToSVR}>
                                <span>?????? ??????</span>
                            </div>
                        </div>
                    </div>
                    <div className='couponDiv'>
                        <p id='listTitle'>?????? ??????</p>
                        <hr className='adminMenuHR'/>
                        <table id='adminTable'>
                            <tr id='adminTableTR'>
                                <td>?????? ??????</td>
                                <td>?????? ??????</td>
                                <td>?????? ??????</td>
                            </tr>
                            <tr className='tr2' id='adminTableTR'>
                                <td><input name='couponReason' id='tableName' value={couponReason} onChange={onValueHandler}/></td>
                                <td><input name='couponVolume' type='number' id='tableName' value={couponVolume} onChange={onValueHandler}/></td>
                                <td><input name='couponDuration' type='number' id='tableName' value={couponDuration} onChange={onValueHandler}/></td>
                            </tr>
                        </table>
                        <div className='PannelContainer' style={{marginTop:'3vh', marginRight:'1.5vw'}}>
                            <div className = 'initializeBtn' name='couponInitiate' style={{marginRight:'10px'}} onClick={onInitiate}>
                                <span>?????????</span>
                            </div>
                            <div className = 'initializeBtn' name='couponSVR' onClick={onSubmitToSVR}>
                                <span>?????? ??????</span>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
            <div className='backToAdminMenus'>
                <BsArrowLeftCircleFill id='backArrow' 
                    onClick={backToAdmin} 
                    onMouseOver={textFloating} 
                    onMouseLeave={textHiding}/> 
                <span id='backToText'>
                    Back to Admin menus
                </span>
            </div>
        </div>
    )
}

export default UserManage