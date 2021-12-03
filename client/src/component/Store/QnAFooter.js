import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import '../../css/style.css'
import { getQnAData } from '../../_actions/user_action'
import { QnAPagination } from '../PaginationComp/PaginationComp'

function QnAFooter(props){
    const PostNum = 5;
    
    const QnAFooterRef = useRef();
    const QnATBodyRef = useRef();
    const QnAPaginationRef = useRef() ;
    const productIndex = props.clothMapNum;
    const clothName = props.clothName;

    const [QnAMap,setQnAMap] = useState('');
    const [MapLength,setMapLength] = useState('');
    const [PostPaging,setPostPaging] = useState(1);

    const dispatch = useDispatch()

    const postPagingHandler = (event) =>{
        event.preventDefault();
        const propPagingNum = event.target.classList.value.split('QnAPaging')[1];
        setPostPaging(propPagingNum)
    }
    
    useEffect(()=>{
        if (productIndex!==0){
            dispatch(getQnAData(productIndex))
            .then(response=>{
                setQnAMap(response.payload.QnAMap);
                setMapLength(response.payload.length);
            })
            
        }
    },[productIndex])

    const QnAPaginationRendering = () =>{
        if (MapLength!==0){
            const finalPage = Math.ceil(MapLength/PostNum);
            return <QnAPagination pagingHandler={postPagingHandler} finalPage={finalPage}/>
        }
    }

    useEffect(()=>{
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
            //footerRendering();
        }
        
    },[MapLength])

    useEffect(()=>{
        if(QnATBodyRef.current.hasChildNodes()){
            ReactDOM.unmountComponentAtNode(QnATBodyRef.current)
        }
        if(QnAMap!=='' && MapLength!=='' & clothName!==undefined){
            let cnt = 0;
            let targetClassName='';
            for (let i=((PostPaging*PostNum)-PostNum)+1; i<(PostPaging*PostNum)+1; i++){
                if (i>MapLength){
                    break;
                }else{
                    if (cnt!==5){
                        const trTag = document.createElement('tr');
                        trTag.className = 'QnA'+cnt;
                        targetClassName = 'QnA'+cnt;
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
                    tdTagProductA.href='/ProductDetail/'+productIndex;
                    tdTagProductA.classList.add('productName')
                    const tdTagProductText = document.createTextNode(clothName);
                    tdTagProductA.appendChild(tdTagProductText);
                    tdTagProduct.appendChild(tdTagProductA);

                    const tdTagTitle = document.createElement('td');
                    const tdTagTitleA = document.createElement('a');
                    tdTagTitleA.href='/QnAOne/'+productIndex+'/'+QnAMap[i]._id;
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
            
            //Product 별 데이터는 인덱스가 들쭉날쭉할 것.
            //일단 Map을 받고, 해당 맵에 대한 각각의 인덱스를 재정립해야됨.
        }
    },[QnAMap,MapLength,clothName])
    

    return(
        <div ref={QnAFooterRef}>
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
                <tbody ref={QnATBodyRef} style={{lineHeight:'40px', borderBottom:'0.5px solid lightgray'}}>
                    
                </tbody>
            </table>
            <div className="paginationFooter" ref={QnAPaginationRef}>
                {QnAPaginationRendering()}
            </div>
            <button className='SubmitBtn' style={{marginTop:'30px', marginLeft:'82%'}}><a href={"/QnAPost/"+productIndex}>글 쓰기</a></button>
        </div>
    )
}

export default QnAFooter