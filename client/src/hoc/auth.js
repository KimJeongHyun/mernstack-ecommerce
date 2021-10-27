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
                    if (option===false){
                        alert('으악!');
                    }

                    if (response.payload.ID==='admin'){
                        switch(SpecificComponent.name){
                            case 'Login':
                            case 'Join':
                            case 'MyPage':
                            case 'Cart':
                            case 'ProductDetail':
                            case 'QnAPost':
                            case 'ReviewPost':
                            case 'QnAView':
                            case 'ReviewView':
                            case 'Help':
                                alert('유저 전용 메뉴입니다.')
                                props.history.push({
                                    pathname:'/Main'
                                })
                        }
                    }

                    if (SpecificComponent.name==='NoticePost' || SpecificComponent.name==='AdminLandingPage'){
                        if (response.payload.ID!=='admin'){
                            alert('비정상적인 접근입니다.')
                            props.history.push({
                                pathname:'/'
                            })
                        }
                    }
                }else{
                    if (option===true && SpecificComponent.name!=='Logout'){
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