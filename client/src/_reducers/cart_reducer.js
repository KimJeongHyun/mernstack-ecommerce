import {
    ADD_CART
} from '../_actions/types'


export default function (state=[], action){
    switch (action.type){
        case ADD_CART:
            return [...state, action.payload]
        default:
            return state;
    }
}