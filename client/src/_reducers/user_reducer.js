import {
    AUTH_USER,
    LOGIN_USER,
    REGISTER_USER
} from '../_actions/types'



export default function (state={}, action){
    switch (action.type){
        case AUTH_USER:
            return {...state, isAuth: action.payload}
            break;
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            break;
        case REGISTER_USER:
            return {...state, registerSuccess: action.payload}
            break;
        
        default:
            return state;
    }
}