import React, { useEffect, useState } from 'react';

import Header from '../../Components/GlobalComp/header';
import Main from '../../Components/addAddressComp/main'
import Modal from '../../Components/GlobalComp/modalPost';

import Cookie from 'js-cookie';
import api from '../../api.js'

import $ from 'jquery';

export default function Profile() {

    document.getElementsByTagName("title")[0].innerText = 'Don8 | Conta';

    const [headerColor, setHeaderColor] = useState(false)

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setHeaderColor(true);
            } else {
                setHeaderColor(false)
            }
        }

        window.addEventListener('scroll', scrollListener)

        return () => {
            window.removeEventListener('scroll', scrollListener)
        }

    }, [])


    const [userName, setUserName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [idType, setIdType] = useState('')
    const [loginToken, setLoginToken] = useState(false)

    $(document).ready(async function () {

        const _id = Cookie.get('ID', 'value');
        const idType = Cookie.get('Type', 'value');
        setIdType(idType)

        switch (idType) {
            case 'cpf':
                const rawUserData = await api.get('/user', {
                    headers: {
                        _id
                    }
                })
                if (rawUserData.data._id !== null) {
                    setUserName(rawUserData.data.userName)
                    setLoginToken(true)
                } else {
                    setLoginToken(false)
                }
                break;
            case 'cnpj':
                const rawCompanyData = await api.get('/company', {
                    headers: {
                        _id
                    }
                })
                if (rawCompanyData.data._id !== null) {
                    setLoginToken(true)
                    setCompanyName(rawCompanyData.data.rep.name);
                } else {
                    setLoginToken(false)
                }
                break;
            default:
                break;
        }
    })

    return (
        <>
            <Header
                change={headerColor}
                loginToken={loginToken}
                loggedUserName={
                    idType === 'cpf' ?
                        userName
                        :
                        companyName
                }
            />
            <Main />
            <Modal />
        </>
    )
}