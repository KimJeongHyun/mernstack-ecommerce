import axios from "axios";

import{
    AUTH_USER,
    LOGIN_USER,
    REGISTER_USER,
    GET_USERS,
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
    CLEAR_NOTICE,
    GET_CART,
    POST_CART,
    CLEAR_CART,
    SEND_MAIL
} from './types';

const BASE_URL = 'https://mernecommerce-jh.herokuapp.com'

export function auth(){
    const request=axios.get(`${BASE_URL}/api/getSession`)
    .then(response=>response.data);

    return {
        type:AUTH_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    const request = axios.post(`${BASE_URL}/api/register`,dataToSubmit)
    .then(response=>response.data);
    return {
        type:REGISTER_USER,
        payload:request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${BASE_URL}/api/login`, dataToSubmit)
    .then(response=>response.data);
    return{
        type:LOGIN_USER,
        payload:request
    }
}

export function getUsers(){
    const request = axios.get(`${BASE_URL}/api/getUsers`)
    .then(response=>response.data);

    return{
        type:GET_USERS,
        payload:request
    }
}

export function getClothes(){
    const request = axios.get(`${BASE_URL}/api/getClothes`)
    .then(response=>response.data);

    return{
        type:GET_CLOTHES,
        payload:request
    }
}

export function getDetailData(dataParam){
    const request = axios.get(`${BASE_URL}/api/getDetailData/`+dataParam)
    .then(response=>response.data);

    return{
        type:GET_DETAILDATA,
        payload:request
    }
}

export function getQnAData(dataParam){
    const request = axios.get(`${BASE_URL}/api/getQnA/`+dataParam)
    .then(response=>response.data);

    return{
        type:GET_QNA,
        payload:request
    }
}

export function getQnADataOne(dataParam1,dataParam2){
    const request = axios.get(`${BASE_URL}/api/getQnAOne/`+dataParam1+'/'+dataParam2)
    .then(response=>response.data);

    return{
        type:GET_QNAONE,
        payload:request
    }
}

export function getQnADataAll(){
    const request = axios.get(`${BASE_URL}/api/getQnAAll/`)
    .then(response=>response.data);

    return{
        type:GET_QNAALL,
        payload:request
    }
}

export function postQnAData(dataToSubmit){
    const request = axios.post(`${BASE_URL}/api/postQnA/`,dataToSubmit)
    .then(response=>response.data);

    return{
        type:POST_QNA,
        payload:request
    }
}

export function getReviewData(dataParam){
    const request = axios.get(`${BASE_URL}/api/getReview/`+dataParam)
    .then(response=>response.data);

    return{
        type:GET_REVIEW,
        payload:request
    }
}

export function getReviewDataOne(dataParam1,dataParam2){
    const request = axios.get(`${BASE_URL}/api/getReviewOne/`+dataParam1+'/'+dataParam2)
    .then(response=>response.data);
    
    return{
        type:GET_REVIEWONE,
        payload:request
    }
}

export function getReviewDataAll(){
    const request = axios.get(`${BASE_URL}/api/getReviewAll/`)
    .then(response=>response.data);

    return{
        type:GET_REVIEWALL,
        payload:request
    }
}


export function postReviewData(dataToSubmit){
    const request = axios.post(`${BASE_URL}/api/postReview/`,dataToSubmit)
    .then(response=>response.data);

    return{
        type:POST_REVIEW,
        payload:request
    }
}

export function getNotice(){
    const request = axios.get(`${BASE_URL}/api/getNotice/`)
    .then(response=>response.data)

    return{
        type:GET_NOTICE,
        payload:request
    }
}

export function getNoticeOne(dataParam1,dataParam2){
    const request = axios.get(`${BASE_URL}/api/getNoticeOne/`+dataParam1+'/'+dataParam2)
    .then(response=>response.data)

    return{
        type:GET_NOTICEONE,
        payload:request
    }
}

export function postNotice(dataToSubmit){
    const request = axios.post(`${BASE_URL}/api/postNotice/`,dataToSubmit)
    .then(response=>response.data)

    return{
        type:POST_NOTICE,
        payload:request
    }
}

export function clearNotice(dataToSubmit){
    const request = axios.post(`${BASE_URL}/api/clearNotice/`,dataToSubmit)
    .then(response=>response.data)

    return{
        type:CLEAR_NOTICE,
        payload:request
    }
}

export function getCart(dataToSubmit){
    const request = axios.post(`${BASE_URL}/api/getCart/`,dataToSubmit)
    return{
        type:GET_CART,
        payload:request
    }
}

export function postCart(dataToSubmit){
    const request = axios.post(`${BASE_URL}/api/postCart/`,dataToSubmit)
    return{
        type:POST_CART,
        payload:request
    }
}

export function clearCart(dataToSubmit){
    const request = axios.post(`${BASE_URL}/api/clearCart`,dataToSubmit)
    return{
        type:CLEAR_CART,
        payload:request
    }
}

export function sendMail(dataToSubmit){
    const request = axios.post(`${BASE_URL}/api/sendMail/`,dataToSubmit)
    return{
        type:SEND_MAIL,
        payload:request
    }
}