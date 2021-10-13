import React,{useEffect,useRef,useState} from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { NavSideBar } from '../../NavBar/NavSideBar'
import { NavBar } from '../../NavBar/NavBar'
import { Footer } from '../../Footer/Footer'
import '../../../css/style.css'
import { getQnADataAll } from '../../../_actions/user_action'



function QnA(props){
    const PostNum = 10;

    const QnATBodyRef = useRef();
    const QnAPaginationRef = useRef();

    const [QnAMap,setQnAMap] = useState('');
    const [MapLength,setMapLength] = useState('');
    const [PostPaging,setPostPaging] = useState(1);

    const dispatch = useDispatch()

    const postPagingHandler = (event) =>{
        event.preventDefault();
        const propPagingNum = event.target.classList.value.split('QnAPaging')[1];
        if (propPagingNum!==PostPaging){
            setPostPaging(propPagingNum)
        }
    }

    useEffect(()=>{
        dispatch(getQnADataAll())
        .then(response=>{
            setQnAMap(response.payload.QnAMap);
            setMapLength(response.payload.length);
        })     
    },[])

    useEffect(()=>{
        console.log(QnAMap);
        const footerRendering = () =>{
            const result=[];
            for (let i=0; i<MapLength/PostNum; i++){
                result.push(
                    <span onClick={postPagingHandler}>
                        <a className={'QnAPaging'+(i+1)} href="#none" >[{i+1}]</a>
                    </span>
                )
            }
            ReactDOM.render(result,QnAPaginationRef.current);
        }
        if (MapLength!==''){
            footerRendering();
        }
        
    },[MapLength])


    useEffect(()=>{
        while(QnATBodyRef.current.hasChildNodes()){
            QnATBodyRef.current.removeChild(QnATBodyRef.current.firstChild)
        }
        if(QnAMap!=='' && MapLength!==''){
            if (MapLength===0){
                const trTag = document.createElement('tr');
                trTag.className='EmptyQnATR'
                QnATBodyRef.current.appendChild(trTag);

                const tdTag = document.createElement('td');
                tdTag.colSpan=9
                const tdTagText = document.createTextNode('작성된 글이 없습니다.');
                tdTag.appendChild(tdTagText);

                document.getElementsByClassName('EmptyQnATR')[0].appendChild(tdTag)
            }else{
                let cnt = 0;
                let targetClassName='';
                for (let i=((PostPaging*PostNum)-PostNum)+1; i<(PostPaging*PostNum)+1; i++){
                    if (i>MapLength){
                        break;
                    }else{
                        if (cnt!==5){
                            const trTag = document.createElement('tr');
                            trTag.className = 'QnATR'+cnt
                            targetClassName = 'QnATR'+cnt
                            QnATBodyRef.current.appendChild(trTag);
                            cnt=cnt+1;
                        }else{
                            cnt=0
                        }
                        
                        const tdTagNum = document.createElement('td');
                        const tdTagNumText = document.createTextNode(i)
                        tdTagNum.appendChild(tdTagNumText);
    
                        const tdTagProduct = document.createElement('td');
                        const tdTagProductA = document.createElement('a');
                        tdTagProductA.href='/ProductDetail/'+QnAMap[i].clothIndex;
                        tdTagProductA.classList.add('productName')
                        const tdTagProductText = document.createTextNode(QnAMap[i].clothName);
                        tdTagProductA.appendChild(tdTagProductText);
                        tdTagProduct.appendChild(tdTagProductA);
    
                        const tdTagTitle = document.createElement('td');
                        const tdTagTitleA = document.createElement('a');
                        tdTagTitleA.href='/QnAOne/'+QnAMap[i].clothIndex+'/'+QnAMap[i]._id;
                        tdTagTitleA.classList.add('title')
                        const tdTagTitleText = document.createTextNode(QnAMap[i].title);
                        tdTagTitleA.appendChild(tdTagTitleText);
                        tdTagTitle.appendChild(tdTagTitleA);
    
                        const tdTagID = document.createElement('td');
                        const tdTagIDText = document.createTextNode((QnAMap[i].userID).substring(0,3)+"***");
                        tdTagID.appendChild(tdTagIDText);
    
                        const tdTagDate = document.createElement('td');
                        const tdTagDateText = document.createTextNode(QnAMap[i].regDate.split('T')[0]);
                        tdTagDate.appendChild(tdTagDateText);
    
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagNum);
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagProduct);
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagTitle);
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagID);
                        document.getElementsByClassName(targetClassName)[0].appendChild(tdTagDate);
                        
                    }
                }
            }
            
            
            //Product 별 데이터는 인덱스가 들쭉날쭉할 것.
            //일단 Map을 받고, 해당 맵에 대한 각각의 인덱스를 재정립해야됨.
        }
    },[QnAMap,MapLength,PostPaging])

    return(
        <div id='container'>
            <>
                <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent">
                            <div className="QnADiv" style={{paddingLeft:'25%', width:'50%'}}>
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
                                    <tbody ref={QnATBodyRef} style={{lineHeight:'100px', borderBottom:'0.5px solid lightgray'}}>
                                        
                                    </tbody>
                                </table>
                                <div ref={QnAPaginationRef}>

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

export default QnA