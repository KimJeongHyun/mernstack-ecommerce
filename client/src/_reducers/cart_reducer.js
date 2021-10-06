import {
    POST_CART
} from '../_actions/types'


export default function (state={}, action){
    switch (action.type){
        case POST_CART:
            return {...state, postCartSuccess:action.payload}
        default:
            return state;
    }
}