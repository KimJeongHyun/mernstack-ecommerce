import {
    AUTH_USER,
    LOGIN_USER,
    REGISTER_USER,
    GET_CLOTHES,
    GET_DETAILDATA,
    GET_QNA,
    GET_QNAONE,
    GET_QNAALL,
    POST_QNA,
    GET_REVIEW,
    GET_REVIEWONE,
    GET_REVIEWALL,
    POST_REVIEW,
    GET_NOTICE,
    GET_NOTICEONE,
    POST_NOTICE,
    CLEAR_NOTICE
} from '../_actions/types'



export default function (state={}, action){
    switch (action.type){
        case AUTH_USER:
            return {...state, isAuth: action.payload}
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        case REGISTER_USER:
            return {...state, registerSuccess: action.payload}
        case GET_CLOTHES:
            return {...state, getClothSuccess: action.payload}
        case GET_DETAILDATA:
            return {...state,getDetailData: action.payload}
        case GET_QNA:
            return {...state,getQnAData: action.payload}
        case GET_QNAONE:
            return {...state,getQnAOneData: action.payload}
        case GET_QNAALL:
            return {...state,getQnAAllData: action.payload}   
        case POST_QNA:
            return {...state,postQnAData: action.payload}  
        case GET_REVIEW:
            return {...state,getReviewData: action.payload}
        case GET_REVIEWONE:
            return {...state,getReviewOneData: action.payload} 
        case GET_REVIEWALL:
            return {...state,getReviewAllData: action.payload}    
        case POST_REVIEW:
            return {...state,postReviewData: action.payload}  
        case GET_NOTICE:
            return {...state,getNoticeData: action.payload}
        case GET_NOTICEONE:
            return {...state,getNoticeOne: action.payload}    
        case POST_NOTICE:
            return {...state,postNoticeData: action.payload}
        case CLEAR_NOTICE:
            return {...state,clearNoticeSuccess: action.payload}
        default:
            return state;
    }
}