import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import '../../css/style.css'
import { getReviewData } from '../../_actions/user_action'
import { ReviewPagination } from '../PaginationComp/PaginationComp'

function ReviewFooter(props){
    const PostNum = 5;

    const ReviewFooterRef = useRef();
    const ReviewTBodyRef = useRef();
    const ReviewPaginationRef = useRef();
    const productIndex = props.clothMapNum;
    const clothName = props.clothName;

    const [ReviewMap,setReviewMap] = useState('');
    const [MapLength,setMapLength] = useState('');
    const [PostPaging,setPostPaging] = useState(1);

    const dispatch = useDispatch()
    
    const postPagingHandler = (event) =>{
        event.preventDefault();
        const propPagingNum = event.target.classList.value.split('ReviewPaging')[1];
        setPostPaging(propPagingNum)
    }

    useEffect(()=>{
        if (productIndex!==0){
            dispatch(getReviewData(productIndex))
            .then(response=>{
                setReviewMap(response.payload.ReviewMap);
                setMapLength(response.payload.length);
            })
        }
    },[productIndex])

    const ReviewPaginationRendering = () =>{
        if (MapLength!==0){
            const finalPage = Math.ceil(MapLength/PostNum);
            return <ReviewPagination pagingHandler={postPagingHandler} finalPage={finalPage}/>
        }
    }

    useEffect(()=>{
        while(ReviewTBodyRef.current.hasChildNodes()){
            ReviewTBodyRef.current.removeChild(ReviewTBodyRef.current.firstChild)
        }
        if(ReviewMap!=='' && MapLength!=='' & clothName!==undefined){
            let cnt = 0;
            let targetClassName='';
            for (let i=((PostPaging*PostNum)-PostNum)+1; i<(PostPaging*PostNum)+1; i++){
                if (i>MapLength){
                    break;
                }else{
                    if (cnt!==5){
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
                    tdTagProductA.href='/ProductDetail/'+productIndex;
                    tdTagProductA.classList.add('productName')
                    const tdTagProductText = document.createTextNode(clothName);
                    tdTagProductA.appendChild(tdTagProductText);
                    tdTagProduct.appendChild(tdTagProductA);

                    const tdTagTitle = document.createElement('td');
                    const tdTagTitleA = document.createElement('a');
                    tdTagTitleA.href='/ReviewOne/'+productIndex+'/'+ReviewMap[i]._id;
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
    },[ReviewMap,MapLength,clothName,PostPaging])
    

    return(
        <div ref={ReviewFooterRef}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead style={{lineHeight:'40px',borderBottom:'0.5px solid black'}}>
                    <tr>
                        <td>번호</td>
                        <td>품명</td>
                        <td>제목</td>
                        <td>이름</td>
                        <td>날짜</td>
                    </tr>
                </thead>
                <tbody ref={ReviewTBodyRef} style={{lineHeight:'40px', borderBottom:'0.5px solid lightgray'}}>
                
                </tbody>
            </table>
            <div className="paginationFooter" ref={ReviewPaginationRef}>
                {ReviewPaginationRendering()}
            </div>
            <button className='SubmitBtn' style={{marginTop:'30px', marginLeft:'82%'}}><a href={"/ReviewPost/"+productIndex}>글 쓰기</a></button>
        </div>
    )
}

export default ReviewFooter