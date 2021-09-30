import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../NavBar/NavSideBar'
import '../../css/style.css'
import { NavBar } from '../NavBar/NavBar'
import {Footer} from '../Footer/Footer'
import { getDetailData } from '../../_actions/user_action'
import QnAFooter from './QnAFooter'
import ReviewFooter from './ReviewFooter'

function ProductDetail(props){
    const [detailUpdate, setDetailUpdate] = useState(false);

    const boxRef = useRef();
    const cursorBoxRef = useRef();

    const productBodyRef = useRef();
    const productMoreBtnRef = useRef();
    const productShortBtnRef = useRef();

    const productImageRef = useRef();
    const productNameNumRef = useRef();
    const productSellNumRef = useRef();
    const productReviewNumRef = useRef();
    const productDeliveryRef = useRef();
    const productExportRef = useRef();
    const productPriceRef = useRef();
    const productDiscountRef = useRef();
    const productAccumRef = useRef();

    const [productIndex,setProductIndex] = useState(0);
    const [clothMap,setClothMap] = useState('');
    
    const dispatch = useDispatch()


    const imgMouseMoveFunc = (event) =>{
        event.preventDefault();
        const rect = event.target.getBoundingClientRect();
        let xCoordi = event.clientX;
        let yCoordi = event.clientY;
        // 이미지의 맨 위 절대 y좌표는 rect.top
        // 이미지의 맨 밑쪽 절대 y좌표는 rect.bottom
        // 이미지의 맨 왼쪽 절대 x좌표는 rect.left
        // 이미지의 맨 오른쪽 절대 x좌표는 rect.right
        // 사용자의 커서 X좌표 = event.clientX
        // 사용자의 커서 Y좌표 = event.clientY
        // event.clientX-250좌
        // event.clientX+250우
        // event.clientY-250하
        // event.clientY+250상

        if (xCoordi-50<rect.left){
            xCoordi = rect.left+50;
        }
        if (xCoordi+50>rect.right){
            xCoordi = rect.right-50;
        }
        if (yCoordi-50<rect.top){
            yCoordi = rect.top+50;
        }
        if (yCoordi+50>rect.bottom){
            yCoordi = rect.bottom-50;
        }
        const divRendering = () =>{
                const result = [];
                result.push(
                    <div ref={cursorBoxRef} style={{position:'absolute',left:`${xCoordi}px`,top:`${yCoordi}px`}}>
                        hi
                    </div>
                )
                return result;
        }
        ReactDOM.render(divRendering(),boxRef.current);
        cursorBoxRef.current.style.display = 'block'
    }

    const imgMouseLeaveFunc = (event) =>{
        event.preventDefault();
        const rect = event.target.getBoundingClientRect();
        let xCoordi = event.clientX;
        let yCoordi = event.clientY;
        if (xCoordi<=Math.floor(rect.left) || xCoordi>=Math.floor(rect.right)){
            cursorBoxRef.current.style.display = 'none'
        }

        if (yCoordi<=Math.floor(rect.top) || yCoordi>=Math.floor(rect.bottom)){
            cursorBoxRef.current.style.display = 'none'
        }


    }

    useEffect(()=>{
        setProductIndex(props.location.pathname.split('/')[2])
        
    },[])

    useEffect(()=>{
        if (productIndex!=0){
            dispatch(getDetailData(productIndex))
            .then(response=>{
                setClothMap(response.payload.clothRes);
            })
        }
        // 상품의 정보를 DB로부터 받아오면, 그걸 상세 페이지에 렌더링하는 곳.
    },[productIndex])

    useEffect(()=>{
        if (clothMap!=''){
            const imgPath = () =>{
                const result = [];
                result.push(
                    <img src={'../'+clothMap.clothImgPath} style={{maxWidth:'250px'}} onMouseOutCapture={imgMouseLeaveFunc} onMouseMove={imgMouseMoveFunc}/>
                )
                return result;
            }
            ReactDOM.render(imgPath(),productImageRef.current)
            ReactDOM.render(clothMap.clothName,productNameNumRef.current)
            ReactDOM.render(clothMap.sellNum,productSellNumRef.current)
            ReactDOM.render(clothMap.reviewNum,productReviewNumRef.current);
            ReactDOM.render(clothMap.deliverySol,productDeliveryRef.current);
            ReactDOM.render(clothMap.exportRange,productExportRef.current);
            ReactDOM.render(clothMap.sellPrice,productPriceRef.current);
            ReactDOM.render(clothMap.sellPrice*(100-clothMap.discountRate)*0.01,productDiscountRef.current);
            ReactDOM.render(clothMap.sellPrice*(clothMap.discountRate)*0.01,productAccumRef.current)

        }
    },[clothMap])

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
                                <div className="productImage" ref={productImageRef} style={{width:'250px', display:'inline-block'}}>
                                    
                                </div>
                                <div className="productInfo" style={{lineHeight:'20px'}}>
                                    <h3 style={{marginTop:'5px',marginBottom:'5px'}}> Product Info </h3>
                                    <span>품명 / 품번 </span> &#124; &nbsp;
                                    <span ref={productNameNumRef}></span> / {productIndex} <br/>
                                    <span>판매 갯수</span> &nbsp; &#124; &nbsp;
                                    <span ref={productSellNumRef}></span> <br/> 
                                    <span>구매 후기</span> &nbsp; &#124; &nbsp;
                                    <span ref={productReviewNumRef}></span> <br/>  
                                    <hr style={{marginTop:'5px',border:'none',backgroundColor:'lightgray', width:'50%', height:'1px', margin:'0'}}/>
                                    <h3 style={{marginTop:'5px',marginBottom:'5px'}}> Delivery Info</h3>
                                    <span>배송 방법</span> &nbsp; &#124; &nbsp;
                                    <span ref={productDeliveryRef}></span> <br/>  
                                    <span>출고 기간</span> &nbsp; &#124; &nbsp;
                                    <span ref={productExportRef}></span> <br/>  
                                    <hr style={{marginTop:'5px',border:'none',backgroundColor:'lightgray', width:'50%', height:'1px', margin:'0'}}/>
                                    <h3 style={{marginTop:'5px',marginBottom:'5px'}}>Price Info</h3>
                                    <span>판매가</span> &nbsp; &#124; &nbsp;
                                    <span ref={productPriceRef}></span> 원<br/>
                                    <span>할인가</span> &nbsp; &#124; &nbsp; 
                                    <span ref={productDiscountRef}></span> 원<br/>
                                    <span>적립금</span> &nbsp; &#124; &nbsp; 
                                    <span ref={productAccumRef}></span> 원
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
                            <div className="productFooter" style={{height:'900px', textAlign:'center'}}>
                                <div style={{textAlign:'center', height:'100px'}}>
                                    <button ref={productMoreBtnRef} style={{width:'30%', marginTop:'20px'}} onClick={moreDetail}>내용 더 보기</button>
                                    <button ref={productShortBtnRef} style={{width:'30%', marginTop:'20px'}} onClick={hideDetail} hidden>내용 감추기</button>
                                </div>
                                <hr style={{height:'2px' ,border:'none', backgroundColor:'#676767'}}/>
                                <p style={{left:'50%'}}>Q&amp;A</p>
                                <div style={{height:'200px', marginTop:'10px', marginBottom:'100px', textAlign:'center'}}>
                                    <QnAFooter clothMapNum={productIndex} clothName={clothMap.clothName}/>
                                </div>
                                <hr style={{height:'2px' ,border:'none', backgroundColor:'#676767'}}/>
                                <p style={{left:'50%'}}>Review</p>
                                <div style={{height:'200px', marginTop:'10px', marginBottom:'10px',textAlign:'center'}}>
                                    <ReviewFooter clothMapNum={productIndex} clothName={clothMap.clothName}/>
                                </div>
                            </div>
                        </div>
                        <nav className='payBox'>
                            <div className='payContainer'>

                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div ref={boxRef}>

            </div>
            <Footer/>
        </div>
    )
}

export default ProductDetail



/* 줌인 줌아웃 방법
function zoomIn() {
    image.style.transform="scale(1.2)"
    image.style.transition = "all 0.5s"
}

function zoomOut() {
    image.style.transform="scale(1.0)"
    image.style.transition = "all 0.5s"
}

image.addEventListener('mouseenter',zoomIn)
image.addEventListener('mouseleave',zoomOut)
*/