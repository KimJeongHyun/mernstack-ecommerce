import {
    GET_CART,
    POST_CART
} from '../_actions/types'


export default function (state={}, action){
    switch (action.type){
        case GET_CART:
                return {...state,getCartSuccess:action.payload}
        case POST_CART:
            return {...state, postCartSuccess:action.payload}
        default:
            return state;
    }
}