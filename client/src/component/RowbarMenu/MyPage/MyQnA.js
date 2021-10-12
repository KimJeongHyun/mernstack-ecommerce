

export function MyQnARendering(){
    return(
        <table className='qnaTable' style={{width:'80%', textAlign:'center', borderCollapse:'collapse'}}>
            <thead style={{lineHeight:'20px',borderTop:'2px solid lightgray',borderBottom:'0.5px solid lightgray'}}>
                <tr>
                    <th>번호</th>
                    <th>품명</th>
                    <th>제목</th>
                    <th>날짜</th>
                </tr>
            </thead>
            <tbody style={{lineHeight:'30px', borderBottom:'0.5px solid lightgray'}}>
                
            </tbody>
        </table>
    )
}

