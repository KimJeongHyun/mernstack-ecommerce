import {
    AUTH_USER,
    LOGIN_USER,
    REGISTER_USER,
    GET_CLOTHES,
    GET_DETAILDATA,
    GET_QNA,
    POST_QNA,
    GET_REVIEW,
    POST_REVIEW
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
        case POST_QNA:
            return {...state,postQnAData: action.payload}  
        case GET_REVIEW:
            return {...state,getReviewData: action.payload}   
        case POST_REVIEW:
            return {...state,postReviewData: action.payload}  
        default:
            return state;
    }
}