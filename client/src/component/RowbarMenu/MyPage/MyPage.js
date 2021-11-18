import React,{useEffect,useState,useRef} from 'react'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'
import axios from 'axios'
import { MyCouponRendering } from './Tabs/MyCoupon'
import { MyAccumRendering } from './Tabs/MyAccum'
import { MyOrderRendering } from './Tabs/MyOrder'
import { MyReviewRendering } from './Tabs/MyReview'
import { MyQnARendering } from './Tabs/MyQnA'


function MyPage(props){
    const selectRef = useRef();
    const accumRef = useRef();
    const couponRef = useRef();
    const qnaRef = useRef();
    
    const reviewRef = useRef();
    const contentsRef = useRef();

    const [userID,setUserID] = useState('');


    const classChange = (e) =>{
        e.preventDefault();
        if (e.target===selectRef.current){
            selectRef.current.classList.add('active');
            accumRef.current.classList.remove('active');
            couponRef.current.classList.remove('active');
            qnaRef.current.classList.remove('active');
            reviewRef.current.classList.remove('active')

            const selectRefRendering = () =>{
                const result=[];
                result.push(
                    <MyOrderRendering/>
                )
                return result;
            }

            ReactDOM.render(selectRefRendering(),contentsRef.current);
        }

        if (e.target===accumRef.current){
            selectRef.current.classList.remove('active');
            accumRef.current.classList.add('active');
            couponRef.current.classList.remove('active');
            qnaRef.current.classList.remove('active');
            reviewRef.current.classList.remove('active')

            const accumRefRendering = () =>{
                const result=[];
                result.push(
                    <MyAccumRendering/>
                )
                return result;
            }

            ReactDOM.render(accumRefRendering(),contentsRef.current);
        }

        if (e.target===couponRef.current){
            selectRef.current.classList.remove('active');
            accumRef.current.classList.remove('active');
            couponRef.current.classList.add('active');
            qnaRef.current.classList.remove('active');
            reviewRef.current.classList.remove('active')

            const couponRefRendering = () =>{
                const result=[];
                result.push(
                    <MyCouponRendering/>
                )
                return result;
            }

            ReactDOM.render(couponRefRendering(),contentsRef.current);
        }

        if (e.target===qnaRef.current){
            selectRef.current.classList.remove('active');
            accumRef.current.classList.remove('active');
            couponRef.current.classList.remove('active');
            qnaRef.current.classList.add('active');
            reviewRef.current.classList.remove('active')

            const qnaRefRendering = () =>{
                const result=[];
                result.push(
                    <MyQnARendering/>
                )
                return result;
            }

            ReactDOM.render(qnaRefRendering(),contentsRef.current);
        }

        if (e.target===reviewRef.current){
            selectRef.current.classList.remove('active');
            accumRef.current.classList.remove('active');
            couponRef.current.classList.remove('active');
            qnaRef.current.classList.remove('active');
            reviewRef.current.classList.add('active')
            
            const reviewRefRendering = () =>{
                const result=[];
                result.push(
                    <MyReviewRendering/>
                )
                return result;
            }

            ReactDOM.render(reviewRefRendering(),contentsRef.current);
        }
    }

    useEffect(()=>{
        axios.get('/api/getSession')
        .then(response=>{
            setUserID(response.data.ID);
        })
    },[])


    return(
        <div id='container'>
            <>
                <div id='blindDiv'>

                </div>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent" style={{textAlign:'left', paddingTop:'30px', paddingLeft:'10%'}}>
                            <div className="myPageButtonDiv">
                                <button className="selectClass active" ref={selectRef} onClick={classChange}>주문내역 조회</button>
                                <button className="accumClass" ref={accumRef} onClick={classChange}>적립금</button>
                                <button className="couponClass" ref={couponRef} onClick={classChange}>쿠폰</button>
                                <button className="qnaClass" ref={qnaRef} onClick={classChange}>Q&amp;A 관리</button>
                                <button className="reviewClass" ref={reviewRef} onClick={classChange}>Review 관리</button>
                                <hr style={{border:'0',width:'80%',height:'1px',backgroundColor:'lightgray', margin:'0px'}}/>
                            </div>
                            <div className="myPageContent" ref={contentsRef}>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        </div>
        
    )
}

export default MyPage