import {useEffect,useState,useRef} from 'react'
import ReactDOM from 'react-dom'

export function QnAPagination(props){
    const [pagiNum,setPagiNum] = useState(1);
    const [finalPage,setFinalPage] = useState(0);
    const postPagingHandler = props.pagingHandler;

    const paginationNumRef = useRef();

    const pageRenderPrev = (event) =>{
        event.preventDefault();
        setPagiNum(1);
    }

    const pageRerenderFinal = (event) =>{
        event.preventDefault();
        setPagiNum(finalPage);
    }
    useEffect(()=>{
        setFinalPage(props.finalPage);
    },[props.finalPage])

    useEffect(() => {
        const footerRendering = () =>{
            const result=[];
            
            if (pagiNum!=finalPage){
                for (let i=pagiNum; i<pagiNum+1; i++){
                    result.push(
                        <span onClick={postPagingHandler}>
                            <a className={'QnAPaging'+(i)} href="#none" >[{i}]</a>
                        </span>
                    )
                }
                result.push(
                    <>
                        <span onClick={pageRerenderFinal}>...[{finalPage}]&#62;&#62;</span>
                    </>
                )
            }
    
            if (pagiNum==finalPage && pagiNum!=finalPage){
                result.push(
                    <>
                        <span onClick={pageRenderPrev}>&#60;&#60;</span>
                    </>
                )
                for (let i=pagiNum; i<finalPage+1; i++){
                    result.push(
                        <span onClick={postPagingHandler}>
                            <a className={'QnAPaging'+(i)} href="#none" >[{i}]</a>
                        </span>
                    )
                }
            }

            if (pagiNum==1 && pagiNum==finalPage){
                for (let i=pagiNum; i<finalPage+1; i++){
                    result.push(
                        <span onClick={postPagingHandler}>
                            <a className={'QnAPaging'+(i)} href="#none" >[{i}]</a>
                        </span>
                    )
                }
            }
    
            return result;
        }
        if (finalPage>0){
            ReactDOM.render(footerRendering(),paginationNumRef.current)
        }
        
    }, [pagiNum, finalPage])

    return(
        <>
            <span onClick={postPagingHandler} style={{marginRight:'20px'}}>
                <a className={'QnAPaging1'} href="#none" >&#60;</a>
            </span>
            <div ref={paginationNumRef}>

            </div>
            <span onClick={postPagingHandler} style={{marginLeft:'20px'}}>
                <a className={'QnAPaging'+finalPage} href="#none" >&#62;</a>
            </span>
        </>
    )
}

export function ReviewPagination(props){
    const [pagiNum,setPagiNum] = useState(1);
    const [finalPage,setFinalPage] = useState(0);
    const postPagingHandler = props.pagingHandler;

    const paginationNumRef = useRef();

    const pageRenderPrev = (event) =>{
        event.preventDefault();
        setPagiNum(1);
    }

    const pageRerenderFinal = (event) =>{
        event.preventDefault();
        setPagiNum(finalPage);
    }
    useEffect(()=>{
        setFinalPage(props.finalPage);
    },[props.finalPage])

    useEffect(() => {
        const footerRendering = () =>{
            const result=[];
            
            if (pagiNum!=finalPage){
                for (let i=pagiNum; i<pagiNum+1; i++){
                    result.push(
                        <span onClick={postPagingHandler}>
                            <a className={'ReviewPaging'+(i)} href="#none" >[{i}]</a>
                        </span>
                    )
                }
                result.push(
                    <>
                        <span onClick={pageRerenderFinal}>...[{finalPage}]&#62;&#62;</span>
                    </>
                )
            }
    
            if (pagiNum==finalPage && pagiNum!=finalPage){
                result.push(
                    <>
                        <span onClick={pageRenderPrev}>&#60;&#60;</span>
                    </>
                )
                for (let i=pagiNum; i<finalPage+1; i++){
                    result.push(
                        <span onClick={postPagingHandler}>
                            <a className={'ReviewPaging'+(i)} href="#none" >[{i}]</a>
                        </span>
                    )
                }
            }

            if (pagiNum==1 && pagiNum==finalPage){
                for (let i=pagiNum; i<finalPage+1; i++){
                    result.push(
                        <span onClick={postPagingHandler}>
                            <a className={'ReviewPaging'+(i)} href="#none" >[{i}]</a>
                        </span>
                    )
                }
            }
    
            return result;
        }
        if (finalPage>0){
            ReactDOM.render(footerRendering(),paginationNumRef.current)
        }
        
    }, [pagiNum, finalPage])

    return(
        <>
            <span onClick={postPagingHandler} style={{marginRight:'20px'}}>
                <a className={'ReviewPaging1'} href="#none" >&#60;</a>
            </span>
            <div ref={paginationNumRef}>

            </div>
            <span onClick={postPagingHandler} style={{marginLeft:'20px'}}>
                <a className={'ReviewPaging'+finalPage} href="#none" >&#62;</a>
            </span>
        </>
    )
}

export function NoticePagination(props){
    const [pagiNum,setPagiNum] = useState(1);
    const [finalPage,setFinalPage] = useState(0);
    const postPagingHandler = props.pagingHandler;

    const paginationNumRef = useRef();

    const pageRenderPrev = (event) =>{
        event.preventDefault();
        setPagiNum(1);
    }

    const pageRerenderFinal = (event) =>{
        event.preventDefault();
        setPagiNum(finalPage);
    }
    useEffect(()=>{
        setFinalPage(props.finalPage);
    },[props.finalPage])

    useEffect(() => {
        const footerRendering = () =>{
            const result=[];
            
            if (pagiNum!=finalPage){
                for (let i=pagiNum; i<pagiNum+1; i++){
                    result.push(
                        <span onClick={postPagingHandler}>
                            <a className={'PostPaging'+(i)} href="#none" >[{i}]</a>
                        </span>
                    )
                }
                result.push(
                    <>
                        <span onClick={pageRerenderFinal}>...[{finalPage}]&#62;&#62;</span>
                    </>
                )
            }
    
            if (pagiNum==finalPage && pagiNum!=finalPage){
                result.push(
                    <>
                        <span onClick={pageRenderPrev}>&#60;&#60;</span>
                    </>
                )
                for (let i=pagiNum; i<finalPage+1; i++){
                    result.push(
                        <span onClick={postPagingHandler}>
                            <a className={'PostPaging'+(i)} href="#none" >[{i}]</a>
                        </span>
                    )
                }
            }

            if (pagiNum==1 && pagiNum==finalPage){
                for (let i=pagiNum; i<finalPage+1; i++){
                    result.push(
                        <span onClick={postPagingHandler}>
                            <a className={'PostPaging'+(i)} href="#none" >[{i}]</a>
                        </span>
                    )
                }
            }
    
            return result;
        }
        if (finalPage>0){
            ReactDOM.render(footerRendering(),paginationNumRef.current)
        }
        
    }, [pagiNum, finalPage])

    return(
        <>
            <span onClick={postPagingHandler} style={{marginRight:'20px'}}>
                <a className={'PostPaging1'} href="#none" >&#60;</a>
            </span>
            <div ref={paginationNumRef}>

            </div>
            <span onClick={postPagingHandler} style={{marginLeft:'20px'}}>
                <a className={'PostPaging'+finalPage} href="#none" >&#62;</a>
            </span>
        </>
    )
}

export function StorePagination(props){

    const [pagiNum,setPagiNum] = useState(0);

    const paginationNumRef = useRef();
    const finalPage = props.finalPage;
    const currentPage = parseInt(props.currentPage-1);

    const pageRenderPrev = (event) =>{
        event.preventDefault();
        setPagiNum(0);
    }

    const pageRerenderFinal = (event) =>{
        event.preventDefault();
        setPagiNum(finalPage-1);
    }

    useEffect(()=>{
        setPagiNum(currentPage);
    },[props.currentPage])

    useEffect(() => {
        const footerRendering = () =>{
            const result=[];
            
            if (pagiNum!=finalPage-1){
                for (let i=pagiNum; i<pagiNum+1; i++){
                    const urlParam = i+1;
                    result.push(
                        <span key={i}>
                            <a href={"/Store/"+urlParam}>[{i+1}]</a>
                        </span>
                    )
                }
                result.push(
                    <>
                        <span onClick={pageRerenderFinal}>...[{finalPage}]&#62;&#62;</span>
                    </>
                )
            }
    
            if (pagiNum==finalPage-1){
                result.push(
                    <>
                        <span onClick={pageRenderPrev}>&#60;&#60;</span>
                    </>
                )
                for (let i=pagiNum; i<finalPage; i++){
                    const urlParam = i+1;
                    result.push(
                        <span key={i}>
                            <a href={"/Store/"+urlParam}>[{i+1}]</a>
                        </span>
                    )
                }
            }
    
            return result;
        }
        ReactDOM.render(footerRendering(),paginationNumRef.current)
    }, [pagiNum])

    return(
        <>
            <span style={{marginRight:'20px'}}>
                <a href={"/Store/"+1}>&#60;</a>
            </span>
            <div ref={paginationNumRef}>

            </div>
            <span style={{marginLeft:'20px'}}>
                <a href={"/Store/"+(finalPage)}>&#62;</a>
            </span>
        </>

    )
}
