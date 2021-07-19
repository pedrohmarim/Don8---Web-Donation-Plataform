import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/GlobalComp/header';
import PostDetail from '../../Components/ViewPostComp/main';
import ModalPost from '../../Components/GlobalComp/modalPost';

import Cookie from 'js-cookie';
import api from '../../api.js'

export default function ViewPost() {

    const { id, postTitle } = useParams();

    const [headerColor, setHeaderColor] = useState(false)

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
    }, [])

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
            <PostDetail id={id ? id : null} postTitle={postTitle} />
            <ModalPost />
        </>
    )
}