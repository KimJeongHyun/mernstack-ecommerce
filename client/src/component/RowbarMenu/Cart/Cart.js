import React,{useEffect,useRef,useState} from 'react'
import { useSelector, connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'


function Cart(props){
    const cart = useSelector(store=>store.cart)
    console.log(cart);
    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent">
                            <div className="CartDiv" style={{paddingLeft:'25%', width:'50%'}}>
                                <table style={{width:'100%', borderCollapse:'collapse'}}>
                                    <thead style={{lineHeight:'50px',borderBottom:'0.5px solid black'}}>
                                        <tr>
                                            <td>번호</td>
                                            <td>품명</td>
                                            <td>가격</td>
                                            <td>배송비</td>
                                        </tr>
                                    </thead>
                                    <tbody style={{lineHeight:'50px', borderBottom:'0.5px solid lightgray'}}>
                                        <tr>
                                            <td>asdf</td>
                                            <td>asdf</td>
                                            <td>asdf</td>
                                            <td>asdf</td>
                                        </tr>
                                        <tr>
                                            <td>asdf</td>
                                            <td>asdf</td>
                                            <td>asdf</td>
                                            <td>asdf</td>
                                        </tr>
                                        <tr>
                                            <td>asdf</td>
                                            <td>asdf</td>
                                            <td>asdf</td>
                                            <td>asdf</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button style={{width:'170px',height:'50px', marginTop:'10px', marginRight:'10px', backgroundColor:'#8d8d8d', border:'none',color:'#fff', cursor:'pointer'}}>주문하기</button>
                                <button style={{width:'170px',height:'50px', border:'0.5px solid lightgray', backgroundColor:'#fff', cursor:'pointer'}}>장바구니 비우기</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        </div>
        
    )
}

export default Cart