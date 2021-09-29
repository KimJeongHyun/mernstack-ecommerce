import React,{useEffect,useRef,useState} from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'
import axios from 'axios'
import { getNotice } from '../../../_actions/user_action'



function Notice(props){
    const PostNum = 10;

    const NoticeTBodyRef = useRef();
    const NoticePaginationRef = useRef();
    const NoticeBtnRef = useRef();
    const dispatch = useDispatch()
    
    const [NoticeMap,setNoticeMap] = useState('')
    const [MapLength,setMapLength] = useState('')
    const [PostPaging,setPostPaging] = useState(1);


    const postPagingHandler = (event) =>{
        event.preventDefault();
        const propPagingNum = event.target.classList.value.split('PostPaging')[1];
        if (propPagingNum!=PostPaging){
            setPostPaging(propPagingNum)
        }
    }

    useEffect(()=>{
        axios.get('/api/getSession/')
        .then(response=>{
            if (response.data.ID=='admin'){
                const btnRendering = () =>{
                    const result=[];
                    result.push(
                        <button className='SubmitBtn' style={{marginLeft:'79%'}}>
                            <a href={"/NoticePost/"}>글 쓰기</a>
                        </button>
                    )
                    return result;
                }
                ReactDOM.render(btnRendering(),NoticeBtnRef.current);
            }
        })

        dispatch(getNotice())
        .then(response=>{
            setNoticeMap(response.payload.NoticeMap)
            setMapLength(response.payload.length);
        })
    },[])

    useEffect(()=>{
        const footerRendering = () =>{
            const result=[];
            for (let i=0; i<MapLength/PostNum; i++){
                result.push(
                    <span onClick={postPagingHandler}>
                        <a className={'NoticePaging'+(i+1)} href="#none" >[{i+1}]</a>
                    </span>
                )
            }
            ReactDOM.render(result,NoticePaginationRef.current);
        }
        if (MapLength!=''){
            footerRendering();
        }
        
    },[MapLength])

    useEffect(()=>{
        while(NoticeTBodyRef.current.hasChildNodes()){
            NoticeTBodyRef.current.removeChild(NoticeTBodyRef.current.firstChild)
        }
        if(NoticeMap!='' && MapLength!=''){
            let cnt = 0;
            let targetClassName='';
            for (let i=((PostPaging*PostNum)-PostNum)+1; i<(PostPaging*PostNum)+1; i++){
                if (i>MapLength){
                    break;
                }else{
                    if (cnt!=10){
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
                    const tdTagIDText = document.createTextNode((NoticeMap[i].userID).substring(0,3)+"***");
                    tdTagID.appendChild(tdTagIDText);

                    const tdTagDate = document.createElement('td');
                    const tdTagDateText = document.createTextNode(NoticeMap[i].regDate.split('T')[0]);
                    tdTagDate.appendChild(tdTagDateText);

                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagNum);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagTitle);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagID);
                    document.getElementsByClassName(targetClassName)[0].appendChild(tdTagDate);
                    
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
                                <div ref={NoticeBtnRef}>

                                </div>
                                <div ref={NoticePaginationRef}>

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