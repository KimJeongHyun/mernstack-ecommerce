import React from 'react'

function NotFound(){
    return(
        <div>
            <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center'}}>
                <img src='./images/404.jpg' alt='errorImage' style={{display:'block', marginBottom:'30px'}}/>
                
                <button className="SubmitBtn"><a href="/">메인 페이지</a></button>
            </div>
            
        </div>
        
    )
}

export default NotFound