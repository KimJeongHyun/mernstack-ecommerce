import React,{useRef} from 'react'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'



function MyPage(props){
    const selectRef = useRef();
    const accumRef = useRef();
    const couponRef = useRef();
    const writtenRef = useRef();
    const contentsRef = useRef();

    const classChange = (e) =>{
        if (e.target===selectRef.current){
            selectRef.current.classList.add('active');
            accumRef.current.classList.remove('active');
            couponRef.current.classList.remove('active');
            writtenRef.current.classList.remove('active');

            const selectRefRendering = () =>{
                const result=[];
                result.push(
                    <table className='selectTable' style={{width:'80%', textAlign:'center', borderCollapse:'collapse'}}>
                        <thead style={{lineHeight:'20px',borderTop:'2px solid lightgray',borderBottom:'0.5px solid lightgray'}}>
                            <tr>
                                <th>번호</th>
                                <th>주문일자</th>
                                <th>품명</th>
                                <th>결제금액</th>
                                <th>주문상세</th>
                            </tr>
                        </thead>
                        <tbody style={{lineHeight:'30px', borderBottom:'0.5px solid lightgray'}}>
                            <tr>
                                <td>asdf</td>
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
                                <td>asdf</td>
                            </tr>
                            <tr>
                                <td>asdf</td>
                                <td>asdf</td>
                                <td>asdf</td>
                                <td>asdf</td>
                                <td>asdf</td>
                            </tr>
                        </tbody>
                    </table>
                )
                return result;
            }

            ReactDOM.render(selectRefRendering(),contentsRef.current);
        }

        if (e.target===accumRef.current){
            selectRef.current.classList.remove('active');
            accumRef.current.classList.add('active');
            couponRef.current.classList.remove('active');
            writtenRef.current.classList.remove('active');

            const accumRefRendering = () =>{
                const result=[];
                result.push(
                    <table className='accumTable' style={{width:'80%', textAlign:'center', borderCollapse:'collapse'}}>
                        <thead style={{lineHeight:'20px',borderTop:'2px solid lightgray',borderBottom:'0.5px solid lightgray'}}>
                            <tr>
                                <th>날짜</th>
                                <th>적립내역</th>
                                <th>적립금</th>
                            </tr>
                        </thead>
                        <tbody style={{lineHeight:'30px', borderBottom:'0.5px solid lightgray'}}>
                            <tr>
                                <td>asdf</td>
                                <td>asdf</td>
                                <td>asdf</td>
                            </tr>
                            <tr>
                                <td>asdf</td>
                                <td>asdf</td>
                                <td>asdf</td>
                            </tr>
                            <tr>
                                <td>asdf</td>
                                <td>asdf</td>
                                <td>asdf</td>
                            </tr>
                        </tbody>
                    </table>
                )
                return result;
            }

            ReactDOM.render(accumRefRendering(),contentsRef.current);
        }

        if (e.target===couponRef.current){
            selectRef.current.classList.remove('active');
            accumRef.current.classList.remove('active');
            couponRef.current.classList.add('active');
            writtenRef.current.classList.remove('active');

            const couponRefRendering = () =>{
                const result=[];
                result.push(
                    <table className='couponTable' style={{width:'80%', textAlign:'center', borderCollapse:'collapse'}}>
                        <thead style={{lineHeight:'20px',borderTop:'2px solid lightgray',borderBottom:'0.5px solid lightgray'}}>
                            <tr>
                                <th>쿠폰번호</th>
                                <th>쿠폰이름</th>
                                <th>쿠폰전용품목</th>
                                <th>사용가능금액</th>
                                <th>사용기간</th>
                            </tr>
                        </thead>
                        <tbody style={{lineHeight:'30px', borderBottom:'0.5px solid lightgray'}}>
                            <tr>
                                <td>asdf</td>
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
                                <td>asdf</td>
                            </tr>
                            <tr>
                                <td>asdf</td>
                                <td>asdf</td>
                                <td>asdf</td>
                                <td>asdf</td>
                                <td>asdf</td>
                            </tr>
                        </tbody>
                    </table>
                )
                return result;
            }

            ReactDOM.render(couponRefRendering(),contentsRef.current);
        }

        if (e.target===writtenRef.current){
            selectRef.current.classList.remove('active');
            accumRef.current.classList.remove('active');
            couponRef.current.classList.remove('active');
            writtenRef.current.classList.add('active');

            const writtenRefRendering = () =>{
                const result=[];
                result.push(
                    <table className='writtenTable' style={{width:'80%', textAlign:'center', borderCollapse:'collapse'}}>
                        <thead style={{lineHeight:'20px',borderTop:'2px solid lightgray',borderBottom:'0.5px solid lightgray'}}>
                            <tr>
                                <th>번호</th>
                                <th>게시판</th>
                                <th>제목</th>
                                <th>날짜</th>
                            </tr>
                        </thead>
                        <tbody style={{lineHeight:'30px', borderBottom:'0.5px solid lightgray'}}>
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
                )
                return result;
            }

            ReactDOM.render(writtenRefRendering(),contentsRef.current);
        }
    }

    

    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent" style={{textAlign:'left', paddingTop:'30px', paddingLeft:'10%'}}>
                            <div className="myPageButtonDiv">
                                <button className="selectClass active" ref={selectRef} onClick={classChange}>주문내역 조회</button>
                                <button className="accumClass" ref={accumRef} onClick={classChange}>적립금</button>
                                <button className="couponClass" ref={couponRef} onClick={classChange}>쿠폰</button>
                                <button className="writtenClass" ref={writtenRef} onClick={classChange}>게시물 관리</button>
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