import axios from "axios";

import{
    AUTH_USER,
    LOGIN_USER,
    REGISTER_USER,
    GET_CLOTHES,
    GET_DETAILDATA,
    GET_QNA,
    GET_REVIEW
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

export function getDetailData(dataParam){
    const request = axios.get('/api/getDetailData/'+dataParam)
    .then(response=>response.data);

    return{
        type:GET_DETAILDATA,
        payload:request
    }
}

export function getQnAData(dataParam){
    const request = axios.get('/api/getQnA/'+dataParam)
    .then(response=>response.data);

    return{
        type:GET_QNA,
        payload:request
    }
}

export function getReviewData(dataParam){
    const request = axios.get('/api/getReview/'+dataParam)
    .then(response=>response.data);

    return{
        type:GET_REVIEW,
        payload:request
    }
}