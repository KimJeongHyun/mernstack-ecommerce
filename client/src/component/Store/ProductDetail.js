import React,{useEffect,useRef,useState} from 'react'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../NavBar/NavSideBar'
import '../../css/style.css'
import { NavBar } from '../NavBar/NavBar'
import {Footer} from '../Footer/Footer'

function ProductDetail(props){
    const [detailUpdate, setDetailUpdate] = useState(false);

    const productBodyRef = useRef();
    const productMoreBtnRef = useRef();
    const productShortBtnRef = useRef();

    useEffect(()=>{
        // 상품의 정보를 받아오는 공간.
        // URL은 아마.. /Store/Product/:idx 로 해야될듯?
        const mainRendering = () =>{
            const result=[];
            result.push(
                <>
                   
                </>
            )
            return result;

        }
        
    },[])

    useEffect(()=>{
        
        // 상품의 정보를 DB로부터 받아오면, 그걸 상세 페이지에 렌더링하는 곳.
        
    },[detailUpdate])

    const moreDetail = (e) =>{
        e.preventDefault();
        productBodyRef.current.classList.add('active');
        productShortBtnRef.current.removeAttribute('hidden');
        productMoreBtnRef.current.setAttribute('hidden',true);
    }

    const hideDetail = (e) =>{
        e.preventDefault();
        productBodyRef.current.classList.remove('active');
        productShortBtnRef.current.setAttribute('hidden',true);
        productMoreBtnRef.current.removeAttribute('hidden');
    }

    return(
        <div id='container'>
            <NavSideBar/>
            <NavBar/>
            <div className="uxArea">
                <div className="contentContainer" style={{maxHeight:'1200px'}}>
                    <div className="uxContent" style={{paddingTop:'20px',textAlign:'left'}}>
                        <div className="productContainer" style={{paddingLeft:'10%', height:'1200px',display:'inline-block'}}>
                            <div className="productHeader" style={{width:'100%',height:'600px'}}>
                                <div className="productImage" style={{width:'250px', display:'inline-block'}}>
                                    <img src='images/jacket.jpg' style={{maxWidth:'250px'}}></img>
                                </div>
                                <div className="productInfo">
                                    <h3> Product Info </h3>
                                    <p> 품명 / 품번 </p>
                                    <p> 판매 갯수 </p>
                                    <p> 구매 후기 </p>
                                    <hr style={{border:'1px 0px 0px 0px solid #676767', width:'50%', margin:'0'}}/>
                                    <h3> Delivery Info</h3>
                                    <p> 배송 방법 </p>
                                    <p> 출고 기간 </p>
                                    <hr style={{border:'1px 0px 0px 0px solid #676767', width:'50%', margin:'0'}}/>
                                    <h3>Price Info</h3>
                                    <p>판매가</p>
                                    <p>할인가</p>
                                    <p>적립금</p>
                                </div>
                                <div className="productSize">
                                    <table>
                                        <thead>
                                            <td>cm</td>
                                            <td>총장</td>
                                            <td>허리단면</td>
                                            <td>허벅지단면</td>
                                            <td>밑위</td>
                                            <td>밑단단면</td>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="sizeRow">S</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="sizeRow">M</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="sizeRow">L</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="sizeRow">XL</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="productBody" ref={productBodyRef}>
                            <hr style={{margin:'0'}}/>
                                <div className="productContent" style={{width:'722px',float:'left'}}>
                                    <img src="images/Coor.jpg" style={{width:'100%'}}></img>
                                    <img src="images/jacket.jpg" style={{width:'100%'}}></img>
                                </div>
                            </div>
                            <div className="productFooter" style={{height:'300px'}}>
                                {/*div 태그에 textalign center로 감싸고, width를 바꿔보자*/}
                                <div style={{textAlign:'center'}}>
                                    <button ref={productMoreBtnRef} style={{width:'30%', marginTop:'20px'}} onClick={moreDetail}>내용 더 보기</button>
                                    <button ref={productShortBtnRef} style={{width:'30%', marginTop:'20px'}} onClick={hideDetail} hidden>내용 감추기</button>
                                </div>
                            </div>
                        </div>
                        <nav className='box' style={{width:'400px', height:'500px', display:'inline-block'}}>
                            <div style={{border:'1px solid black', height:'500px'}}>

                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ProductDetail