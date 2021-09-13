import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null){
    function AuthenticationCheck(props){
        console.log(option);
        const dispatch = useDispatch();
        useEffect(()=>{
            dispatch(auth())
            .then(response=>{
                if (response.payload.isAuth){
                    if (option==false){
                        alert('으악!');
                    }
                }else{
                    if (option==true && SpecificComponent.name!=='Logout'){
                        alert('로그인을 먼저 해주시기 바랍니다.')
                        props.history.push({
                            pathname:'/'
                        })
                    }
                }
            })
        },[])

        return <SpecificComponent/>
    }
    return AuthenticationCheck
}