import React, {useEffect,useState,useRef} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import { ReviewPagination } from '../../../PaginationComp/PaginationComp';

export function MyReviewRendering(){
    const PostNum = 10;

    const ReviewTBodyRef = useRef();
    const ReviewPaginationRef = useRef();
    const ReviewBtnRef = useRef();
    
    
    const [ReviewMap,setReviewMap] = useState('')
    const [MapLength,setMapLength] = useState('')
    const [PostPaging,setPostPaging] = useState(1);
    const [deleteList,setDeleteList] = useState([]);
    const [userID,setUserID] = useState('')


    const postPagingHandler = (event) =>{
        event.preventDefault();
        const propPagingNum = event.target.classList.value.split('PostPaging')[1];
        if (propPagingNum!==PostPaging){
            setPostPaging(propPagingNum)
        }
    }

    const deleteListCheck = (event) =>{
        event.preventDefault();
        const index = event.target.classList.add.substring(4)
        if (event.target.checked){
            setDeleteList(deleteList=>[...deleteList,index])
        }
        
        if (!event.target.checked){
            setDeleteList(deleteList=>deleteList.filter(item=>item!==index));
        }
    }

    const deleteVisible = (event) =>{
        event.preventDefault();
        const Btns = document.getElementsByClassName('Check');
        const deleteCheckBtn = document.getElementById('deleteCheckBtn')
        const deleteGroupBtn = document.getElementById('deleteGroupBtn')

        deleteCheckBtn.style.display='none'
        deleteGroupBtn.style.display='inline-block'
        
        for (let i=0; i<Btns.length; i++){
            Btns[i].style.display='block'
        }
    }

    const deleteGroup = (event) =>{
        event.preventDefault();

        const Btns = document.getElementsByClassName('Check');
        const deleteCheckBtn = document.getElementById('deleteCheckBtn')
        const deleteGroupBtn = document.getElementById('deleteGroupBtn')

        deleteGroupBtn.style.display='none'
        deleteCheckBtn.style.display='inline-block'
        
        for (let i=0; i<Btns.length; i++){
            Btns[i].style.display='none'
        }

        let body={
            deleteList:deleteList
        }

        axios.post('/api/clearReview',body)
        .then(response=>{
            if (response.data.clearReviewSuccess){
                alert("????????? ?????? ?????????????????????.")
            }else{
                alert('????????? ????????????.')
            }
        })
    }

    useEffect(()=>{
        axios.get('/api/getSession')
        .then(response=>{
            setUserID(response.data.ID)
        })
    },[])

    useEffect(()=>{
        if (userID!==''){
            let body = {
                userID:userID
            }
    
            axios.post('/api/getReviewUser',body)
            .then(response=>{
                setReviewMap(response.data.ReviewMap)
                setMapLength(response.data.length);
            })
        }
    },[userID])

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

        if(ReviewMap!=='' && MapLength!==''){
            if (MapLength===0){
                const trTag = document.createElement('tr');
                trTag.className='EmptyReviewTR'
                ReviewTBodyRef.current.appendChild(trTag);

                const tdTag = document.createElement('td');
                tdTag.colSpan=9
                const tdTagText = document.createTextNode('????????? ?????? ????????????.');
                tdTag.appendChild(tdTagText);

                document.getElementsByClassName('EmptyReviewTR')[0].appendChild(tdTag)
            }else{
                let cnt = 0;
                let targetClassName='';
                for (let i=((PostPaging*PostNum)-PostNum)+1; i<(PostPaging*PostNum)+1; i++){
                    if (i>MapLength){
                        break;
                    }else{
                        if (cnt!==10){
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
    
                        const tdTagDate = document.createElement('td');
                        const tdTagDateText = document.createTextNode(ReviewMap[i].regDate.split('T')[0]);
                        tdTagDate.appendChild(tdTagDateText);

                        const tdCheckBtn = document.createElement('td');
                        const tdCheckBtnElement = document.createElement('input');
                        tdCheckBtnElement.type='checkbox'
                        tdCheckBtnElement.classList.add='Prod'+ReviewMap[i].ReviewIndex;
                        tdCheckBtnElement.style.marginTop='20px'
                        tdCheckBtn.classList.add("Check");
                        tdCheckBtn.style.display='none'
                        tdCheckBtnElement.onchange=deleteListCheck
                        tdCheckBtn.appendChild(tdCheckBtnElement);
    
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagNum);
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagProduct);
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagTitle);
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagDate);
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdCheckBtn);
                    }
                }
            }

            //Product ??? ???????????? ???????????? ??????????????? ???.
            //?????? Map??? ??????, ?????? ?????? ?????? ????????? ???????????? ??????????????????.
        }
    },[ReviewMap,MapLength,PostPaging])

    return(
        <>
        <table className='ReviewTable' style={{width:'80%', textAlign:'center', borderCollapse:'collapse'}}>
            <thead style={{lineHeight:'20px',borderTop:'2px solid lightgray',borderBottom:'0.5px solid lightgray'}}>
                <tr>
                    <th>??????</th>
                    <th>??????</th>
                    <th>??????</th>
                    <th>??????</th>
                </tr>
            </thead>
            <tbody ref={ReviewTBodyRef} style={{lineHeight:'30px', borderBottom:'0.5px solid lightgray'}}>
                
            </tbody>
        </table>
        <div className="paginationFooter" ref={ReviewPaginationRef} style={{marginRight:'20%'}}>
            {ReviewPaginationRendering()}
        </div>
        <div ref={ReviewBtnRef}>
            <div style={{marginTop:'20px'}}>
                <div id="deleteBtnDiv" style={{float:'left', width:'21%'}}>
                    <button className="SubmitBtn" id="deleteCheckBtn" style={{marginLeft:'340%'}}>
                        <a href="#!" onClick={deleteVisible}>??????</a>
                    </button>
                    <button className="SubmitBtn" id="deleteGroupBtn" style={{marginLeft:'340%',display:'none'}}>
                        <a href="#!" onClick={deleteGroup}>?????? ??????</a>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

