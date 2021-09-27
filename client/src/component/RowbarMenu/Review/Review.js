import React,{useEffect,useRef,useState} from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'
import { getReviewDataAll } from '../../../_actions/user_action'



function Review(props){
    const PostNum = 5;

    const ReviewTBodyRef = useRef();
    const ReviewPaginationRef = useRef();

    const [ReviewMap,setReviewMap] = useState('');
    const [MapLength,setMapLength] = useState('');
    const [PostPaging,setPostPaging] = useState(1);

    const dispatch = useDispatch()
    
    const postPagingHandler = (event) =>{
        event.preventDefault();
        const propPagingNum = event.target.classList.value.split('ReviewPaging')[1];
        setPostPaging(propPagingNum);
        
    }

    useEffect(()=>{
        dispatch(getReviewDataAll())
        .then(response=>{
            setReviewMap(response.payload.ReviewMap);
            setMapLength(response.payload.length);
        })
    },[])

    useEffect(()=>{
        const footerRendering = () =>{
            const result=[];
            for (let i=0; i<MapLength/PostNum; i++){
                result.push(
                    <span onClick={postPagingHandler}>
                        <a className={'ReviewPaging'+(i+1)} href="#none" >[{i+1}]</a>
                    </span>
                )
            }
            ReactDOM.render(result,ReviewPaginationRef.current);
        }
        if (MapLength!=''){
            footerRendering();
        }
        
    },[MapLength])

    useEffect(()=>{
        const work1 = () =>{
            while(ReviewTBodyRef.current.hasChildNodes()){
                ReviewTBodyRef.current.removeChild(ReviewTBodyRef.current.firstChild)
            }
        }
        work1();
        if(ReviewMap!='' && MapLength!=''){
            let cnt = 0;
            let targetClassName='';
            for (let i=((PostPaging*PostNum)-PostNum)+1; i<(PostPaging*PostNum)+1; i++){
                if (i>MapLength){
                    break;
                }else{
                    if (cnt!=5){
                        const trTag = document.createElement('tr');
                        trTag.className = 'Review'+cnt;
                        targetClassName = 'Review'+cnt;
                        ReviewTBodyRef.current.appendChild(trTag);
                        cnt=cnt+1;
                    }else{
                        cnt=0
                    }
                    
                    const tdTagNum = document.createElement('td');
                    const tdTagNumText = document.createTextNode(i)
                    tdTagNum.appendChild(tdTagNumText);

                    const tdTagProduct = document.createElement('td');
                    const tdTagProductA = document.createElement('a');
                    tdTagProductA.href='/ProductDetail/'+ReviewMap[i].clothIndex;
                    tdTagProductA.classList.add('productName')
                    const tdTagProductText = document.createTextNode(ReviewMap[i].clothName);
                    tdTagProductA.appendChild(tdTagProductText);
                    tdTagProduct.appendChild(tdTagProductA);

                    const tdTagTitle = document.createElement('td');
                    const tdTagTitleA = document.createElement('a');
                    tdTagTitleA.href='/ReviewOne/'+ReviewMap[i].clothIndex+'/'+ReviewMap[i]._id;
                    tdTagTitleA.classList.add('title')
                    const tdTagTitleText = document.createTextNode(ReviewMap[i].title);
                    tdTagTitleA.appendChild(tdTagTitleText);
                    tdTagTitle.appendChild(tdTagTitleA);

                    const tdTagID = document.createElement('td');
                    const tdTagIDText = document.createTextNode((ReviewMap[i].userID).substring(0,3)+"***");
                    tdTagID.appendChild(tdTagIDText);

                    const tdTagDate = document.createElement('td');
                    const tdTagDateText = document.createTextNode(ReviewMap[i].regDate.split('T')[0]);
                    tdTagDate.appendChild(tdTagDateText);

                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagNum);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagProduct);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagTitle);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagID);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagDate);
                    
                }
            }
            
            //Product 별 데이터는 인덱스가 들쭉날쭉할 것.
            //일단 Map을 받고, 해당 맵에 대한 각각의 인덱스를 재정립해야됨.
        }
    },[ReviewMap,MapLength,PostPaging])

    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent">
                            <div className="ReviewDiv" style={{paddingLeft:'25%', width:'50%'}}>
                                <table style={{width:'100%', borderCollapse:'collapse'}}>
                                    <thead style={{lineHeight:'50px',borderBottom:'0.5px solid black'}}>
                                        <tr>
                                            <td>번호</td>
                                            <td>품명</td>
                                            <td>제목</td>
                                            <td>이름</td>
                                            <td>날짜</td>
                                        </tr>
                                    </thead>
                                    <tbody ref={ReviewTBodyRef} style={{lineHeight:'100px', borderBottom:'0.5px solid lightgray'}}>
                                        
                                    </tbody>
                                </table>
                                <div ref={ReviewPaginationRef}>

                                </div>
                                <button style={{width:'170px',height:'50px', marginTop:'10px', marginLeft:'79%', backgroundColor:'#8d8d8d', border:'none',color:'#fff', cursor:'pointer'}}>글 쓰기</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        </div>
        
    )
}

export default Review