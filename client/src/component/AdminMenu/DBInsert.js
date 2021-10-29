import {BsArrowLeftCircleFill} from 'react-icons/bs'
import {gsap} from 'gsap'
import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

function DBInsert(){

    const [imageFileThumb, setImageFileThumb] = useState([])
    const [imageFile, setImageFile] = useState('')
    const [clothName, setClothName] = useState('')
    const [deliverySol, setDeliverySol] = useState('')
    const [exportRange, setExportRange] = useState('')
    const [sellPrice, setSellPrice] = useState(0)
    const [discountRate,setDiscountRate] = useState(0)

    const onValueHandler = (event) =>{
        event.preventDefault();
        const {name,value} = event.target;
        switch(name){
            case 'name':
                setClothName(value)
            break;
            case 'delParty':
                setDeliverySol(value)
            break;
            case 'delRange':
                setExportRange(value)
            break;
            case 'selPrice':
                setSellPrice(value)
            break;
            case 'disRate':
                setDiscountRate(value)
            break;
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
            await gsap.to('.adminMenuDivContainer',{opacity:0,display:'none'})
            await gsap.to('.adminArea',{opacity:1,width:'100%',display:'block'})
        }
        work();
    }

    const imageFileHandle = (event) =>{
        event.preventDefault();
        setImageFile(event.target.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0])
        reader.onload = function(e){
            setImageFileThumb((current)=>{
                const newList = current
                newList.push(e.target.result)
                return newList
            })
            ReactDOM.render(<img className='thumbnail' src={e.target.result}/>,document.getElementById('adminDBImageArea'))
        }
    }

    const initiateClickFunc = (event) =>{
        event.preventDefault();
        setImageFile('')
        setImageFileThumb([])
        ReactDOM.render(<></>,document.getElementById('adminDBImageArea'))
        setClothName('')
        setDeliverySol('')
        setExportRange('')
        setSellPrice('')
        setDiscountRate('')
    }

    const initiate = () =>{
        setImageFile('')
        setImageFileThumb([])
        ReactDOM.render(<></>,document.getElementById('adminDBImageArea'))
        setClothName('')
        setDeliverySol('')
        setExportRange('')
        setSellPrice('')
        setDiscountRate('')
    }

    const submitToSVR = (event) =>{
        event.preventDefault();
        let body = {
            imageURI:imageFile,
            clothName:clothName,
            deliverySol:deliverySol,
            exportRange:exportRange,
            sellPrice:sellPrice,
            discountRate:discountRate
        }

        const formData = new FormData;

        formData.append('img',imageFile)
        formData.append('clothName',clothName)
        formData.append('deliverySol',deliverySol)
        formData.append('exportRange',exportRange)
        formData.append('sellPrice',sellPrice)
        formData.append('discountRate',discountRate)

        axios.post('/api/postProduct',formData)
        .then(response=>{
            if (response.data.postSuccess){
                alert('전송 성공')
                initiate();
            }
        })
    }

    


    return(
        <div className='adminMenuDivContainer'>
            <div className='adminMenuDiv'>
                <div className='adminDBImage'>
                    <div id='adminDBImageArea'>

                    </div>
                    <input id='adminDBImageBtn' type='file' onChange={imageFileHandle}></input>
                </div>
                <div className='adminDBImageText'>
                    <h3>Type product info</h3>
                    <table id='adminTable'>
                        <tr id='adminTableTR'>
                            <td>이름</td>
                            <td>배송업체</td>
                            <td>배송기한</td>
                            <td>가격</td>
                            <td>할인율</td>
                        </tr>
                        <tr className='tr2' id='adminTableTR'>
                            <td><input name='name' id='tableName' value={clothName} onChange={onValueHandler}/></td>
                            <td><input name='delParty' id='tableName' value={deliverySol} onChange={onValueHandler}/></td>
                            <td><input name='delRange' id='tableName' value={exportRange} onChange={onValueHandler}/></td>
                            <td><input type='number' name='selPrice' id='tableName' value={sellPrice} onChange={onValueHandler}/></td>
                            <td><input type='number' name='disRate' id='tableName' value={discountRate} onChange={onValueHandler}/>%</td>
                        </tr>
                    </table>
                </div>
                <hr className='adminMenuHR'/>
                <div className='adminPannel'>
                    <div className='PannelContainer'>
                        <div className = 'initializeBtn' style={{marginRight:'10px'}} onClick={initiateClickFunc}>
                            <span>초기화</span>
                        </div>
                        <div className = 'initializeBtn' onClick={submitToSVR}>
                            <span>서버 전송</span>
                    </div>
                    </div>
                </div>
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

export default DBInsert