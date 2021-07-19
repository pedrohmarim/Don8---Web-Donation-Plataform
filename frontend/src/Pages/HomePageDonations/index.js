import React, { useEffect, useState } from 'react';

import Header from '../../Components/GlobalComp/header';
import Slider from '../../Components/GlobalComp/slider'
import PostsRow from '../../Components/GlobalComp/postsRow';

import Cookie from 'js-cookie';
import api from '../../api.js'


export default function Home() {

    document.getElementsByTagName("title")[0].innerText = 'Don8 | Início';

    const [headerColor, setHeaderColor] = useState(false)

    const [darkMode, setDarkMode] = useState();

    const [userName, setUserName] = useState('')
    const [repCompanyName, setRepCompanyName] = useState('')
    const [idType, setIdType] = useState('')
    const [loginToken, setLoginToken] = useState(false)

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setHeaderColor(true);
            } else {
                setHeaderColor(false)
            }
        }

        window.addEventListener('scroll', scrollListener)

        setDarkMode(JSON.parse(localStorage.getItem("dark")))

        const _id = Cookie.get('ID', 'value');
        const idType = Cookie.get('Type', 'value');
        setIdType(idType)

        switch (idType) {
            case 'cpf':
                api.get('/user', {
                    headers: {
                        _id
                    }
                }).then((res) => {
                    if (res.data._id !== null) {
                        setUserName(res.data.userName)
                        setLoginToken(true)
                    } else {
                        setLoginToken(false)
                    }
                })
                break;
            case 'cnpj':
                api.get('/company', {
                    headers: {
                        _id
                    }
                }).then((res) => {
                    if (res.data._id !== null) {
                        setLoginToken(true)
                        setRepCompanyName(res.data.rep.name);
                    } else {
                        setLoginToken(false)
                    }
                })
                break;
            default:
                break;
        }

        return () => {
            window.removeEventListener('scroll', scrollListener)
        }

    }, []);

    return (
        <>
            <Header
                change={headerColor}
                loginToken={loginToken}
                loggedUserName={
                    idType === 'cpf' ?
                        userName
                        :
                        repCompanyName
                }
            />
            <Slider />
            <PostsRow loginToken={loginToken} loggedUserName={
                idType === 'cpf' ?
                    userName.split(' ')[0] + ' ' + userName.split(' ')[1] :
                    repCompanyName.split(' ')[0] + ' ' + repCompanyName.split(' ')[1]
            } />
            <p className={darkMode ? 'textLightDark font-weight-bold text-center mb-3 mt-3' : 'textDark font-weight-bold text-center mb-3 mt-3'}>© Copyright 2021 - Don8 - Todos os direitos reservados.</p>
        </>
    );

}