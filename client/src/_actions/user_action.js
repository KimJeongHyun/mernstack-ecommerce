import axios from "axios";

import{
    AUTH_USER,
    LOGIN_USER,
    REGISTER_USER,
    GET_CLOTHES
} from './types';

export function auth(){
    const request=axios.get('/api/getSession')
    .then(response=>response.data);

    return {
        type:AUTH_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    const request = axios.post('/api/register',dataToSubmit)
    .then(response=>response.data);
    return {
        type:REGISTER_USER,
        payload:request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post('/api/login', dataToSubmit)
    .then(response=>response.data);
    return{
        type:LOGIN_USER,
        payload:request
    }
}

export function getClothes(){
    const request = axios.get('/api/getClothes')
    .then(response=>response.data);

    return{
        type:GET_CLOTHES,
        payload:request
    }
}