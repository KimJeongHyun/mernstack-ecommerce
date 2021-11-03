import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'
import axios from 'axios'
import { getNotice, clearNotice } from '../../../_actions/user_action'
import { NoticePagination } from '../../PaginationComp/PaginationComp'



function Notice(props){
    const PostNum = 10;

    const NoticeTBodyRef = useRef();
    const NoticePaginationRef = useRef();
    const NoticeBtnRef = useRef();
    
    
    const [NoticeMap,setNoticeMap] = useState('')
    const [MapLength,setMapLength] = useState('')
    const [PostPaging,setPostPaging] = useState(1);
    const [deleteList,setDeleteList] = useState([]);

    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get('/api/getSession/')
        .then(response=>{
            if (response.data.ID==='admin'){
                const deleteCheckBtn = document.getElementById('deleteCheckBtn')
                const noticePostBtn = document.getElementById('noticePostBtn')
                deleteCheckBtn.style.display='inline-block'
                noticePostBtn.style.display='inline-block'
                
            }
        })

        dispatch(getNotice())
        .then(response=>{
            setNoticeMap(response.payload.NoticeMap)
            setMapLength(response.payload.length);
        })
    },[])

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

        dispatch(clearNotice(body))
        .then(response=>{
            console.log(response);
            if (response.payload.clearNoticeSuccess){
                alert("선택된 글이 삭제되었습니다.")
                window.location.replace('/Notice')
            }else{
                alert('오류가 있습니다.')
                window.location.replace('/Notice')
            }
        })
    }

    const NoticePaginationRendering = () =>{
        if (MapLength!==0){
            const finalPage = Math.ceil(MapLength/PostNum);
            return <NoticePagination pagingHandler={postPagingHandler} finalPage={finalPage}/>
        }
    }

    useEffect(()=>{
        while(NoticeTBodyRef.current.hasChildNodes()){
            NoticeTBodyRef.current.removeChild(NoticeTBodyRef.current.firstChild)
        }
        if(NoticeMap!=='' && MapLength!==''){
            if (MapLength===0){
                const trTag = document.createElement('tr');
                trTag.className='EmptyNoticeTR'
                NoticeTBodyRef.current.appendChild(trTag);

                const tdTag = document.createElement('td');
                tdTag.colSpan=9
                const tdTagText = document.createTextNode('공지사항이 없습니다.');
                tdTag.appendChild(tdTagText);

                document.getElementsByClassName('EmptyNoticeTR')[0].appendChild(tdTag)
            }else{
                let cnt = 0;
                let targetClassName='';
                for (let i=((PostPaging*PostNum)-PostNum)+1; i<(PostPaging*PostNum)+1; i++){
                    if (i>MapLength){
                        break;
                    }else{
                        if (cnt!==10){
                            const trTag = document.createElement('tr');
                            trTag.className = 'Notice'+cnt;
                            targetClassName = 'Notice'+cnt;
                            NoticeTBodyRef.current.appendChild(trTag);
                            cnt=cnt+1;
                        }else{
                            cnt=0
                        }
                        
                        const tdTagNum = document.createElement('td');
                        const tdTagNumText = document.createTextNode(i)
                        tdTagNum.appendChild(tdTagNumText);
    
                        const tdTagTitle = document.createElement('td');
                        const tdTagTitleA = document.createElement('a');
                        tdTagTitleA.href='/NoticeOne/'+NoticeMap[i].NoticeIndex+'/'+NoticeMap[i]._id;
                        tdTagTitleA.classList.add('title')
                        const tdTagTitleText = document.createTextNode(NoticeMap[i].title);
                        tdTagTitleA.appendChild(tdTagTitleText);
                        tdTagTitle.appendChild(tdTagTitleA);
    
                        const tdTagID = document.createElement('td');
                        const tdTagIDText = document.createTextNode("admin");
                        tdTagID.appendChild(tdTagIDText);
    
                        const tdTagDate = document.createElement('td');
                        tdTagDate.style.width='25%'
                        const tdTagDateText = document.createTextNode(NoticeMap[i].regDate.split('T')[0]);
                        tdTagDate.appendChild(tdTagDateText);
    
                        const tdCheckBtn = document.createElement('td');
                        const tdCheckBtnElement = document.createElement('input');
                        tdCheckBtnElement.type='checkbox'
                        tdCheckBtnElement.classList.add='Prod'+NoticeMap[i].NoticeIndex;
                        tdCheckBtnElement.style.marginTop='20px'
                        tdCheckBtn.classList.add("Check");
                        tdCheckBtn.style.display='none'
                        tdCheckBtnElement.onchange=deleteListCheck
                        tdCheckBtn.appendChild(tdCheckBtnElement);

                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagNum);
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagTitle);
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagID);
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagDate);
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdCheckBtn);
                    }
                }
            }

            //Product 별 데이터는 인덱스가 들쭉날쭉할 것.
            //일단 Map을 받고, 해당 맵에 대한 각각의 인덱스를 재정립해야됨.
        }
    },[NoticeMap,MapLength,PostPaging])

    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent">
                            <div className="NoticeDiv" style={{paddingLeft:'25%', width:'50%'}}>
                                <table style={{width:'100%', borderCollapse:'collapse'}}>
                                    <thead style={{lineHeight:'50px',borderBottom:'0.5px solid black'}}>
                                        <tr>
                                            <td>번호</td>
                                            <td>공지</td>
                                            <td>이름</td>
                                            <td>날짜</td>
                                        </tr>
                                    </thead>
                                    <tbody ref={NoticeTBodyRef} style={{lineHeight:'100px', borderBottom:'0.5px solid lightgray'}}>
                                        
                                    </tbody>
                                </table>
                                <div className="paginationFooter" ref={NoticePaginationRef} style={{marginTop:'10px'}}>
                                    {NoticePaginationRendering()}
                                </div>
                                <div ref={NoticeBtnRef}>
                                    <div style={{marginTop:'20px'}}>
                                        <div id="deleteBtnDiv" style={{float:'left', width:'21%'}}>
                                            <button className="SubmitBtn" id="deleteCheckBtn" style={{marginLeft:'300%',display:'none'}}>
                                                <a href="#!" onClick={deleteVisible}>삭제</a>
                                            </button>
                                            <button className="SubmitBtn" id="deleteGroupBtn" style={{marginLeft:'300%',display:'none'}}>
                                                <a href="#!" onClick={deleteGroup}>그룹 삭제</a>
                                            </button>
                                        </div>
                                        <div style={{float:'left', width:'21%'}}>
                                            <button className='SubmitBtn' id="noticePostBtn" style={{marginLeft:'300%',display:'none'}}>
                                                <a href={"/NoticePost/"}>글 쓰기</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        </div>
        
    )
}

export default Notice