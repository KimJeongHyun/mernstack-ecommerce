import {
    AUTH_USER,
    LOGIN_USER,
    REGISTER_USER,
    GET_CLOTHES
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
            
        default:
            return state;
    }
}