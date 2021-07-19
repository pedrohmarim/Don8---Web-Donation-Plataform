import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { TextField } from '@material-ui/core';

import { FiUser, FiCreditCard, FiMail, FiLock, FiEdit, FiPhone, FiPlus } from 'react-icons/fi'
import { FaRegBuilding } from 'react-icons/fa'

import $ from 'jquery';

import api from '../../api.js'
import Cookie from 'js-cookie';

import Swal from 'sweetalert2'

export default function Main() {

    var history = useHistory();

    const [darkMode, setDarkMode] = useState();

    const _id = Cookie.get('ID', 'value');
    const [loadAdresses, setLoadAdresses] = useState([{}])

    const idType = Cookie.get('Type', 'value');

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("dark")))

        switch (idType) {
            case 'cpf':
                api.get('/user', {
                    headers: {
                        _id
                    }
                }).then((res) => {
                    $("#userLogin").val(res.data.cpf)
                    $("#userPassword").val(res.data.password)
                    $("#userName").val(res.data.userName)
                    $("#userEmail").val(res.data.email)
                    $("#userCel").val(res.data.cel)

                    setLoadAdresses(res.data.address)
                })
                break;
            case 'cnpj':
                api.get('/company', {
                    headers: {
                        _id
                    }
                }).then((res) => {
                    $("#userLogin").val(res.data.cnpj)
                    $("#userPassword").val(res.data.password)
                    $("#razSoc").val(res.data.userName)
                    $("#ie").val(res.data.ie)
                    $("#userName").val(res.data.rep.name)
                    $("#userEmail").val(res.data.rep.email)
                    $("#userCel").val(res.data.rep.cel)

                    setLoadAdresses(res.data.address)
                })
                break;
            default:
                break;
        }
    }, [_id, idType]);

    async function verifyAccountAdresses() {

        switch (idType) {
            case 'cpf':
                const rawUserData = await api.get('/user', {
                    headers: {
                        _id
                    }
                })

                if (rawUserData.data.address.length < 3) {
                    history.push('/newAddress')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Máximo de três endereços por conta!',
                    })
                }

                break;
            case 'cnpj':
                const rawCompanyData = await api.get('/company', {
                    headers: {
                        _id
                    }
                })

                if (rawCompanyData.data.address.length < 3) {
                    history.push('/newAddress')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Máximo de três endereços por conta!',
                    })
                }
                break;
            default:
                break;
        }
    }

    return (
        <div className={darkMode ? "backDark animationProfile profileContainer" : "animationProfile profileContainer"}>
            <h1 className={darkMode ? "textLightDark mt-5 pt-4" : "pt-4 mt-5"} >Minha conta</h1>
            <div className={darkMode ? "profile-container w-75 mb-4  backLightDark" : "profile-container w-75 mb-4"}>
                <div className="d-flex align-items-center justify-content-between">
                    <h3 className="mt-2 mb-1 ml-3 ">Dados da conta</h3>
                    <FiEdit size={28} className="mt-2 mr-3" />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-wrap p-3">
                    <TextField
                        disabled
                        label={(
                            <div className='d-flex justify-content-between' style={{ width: '94vw' }}>
                                <div className="d-flex justify-content-center align-items-center ajustFont">
                                    <FiCreditCard className="mr-1" />
                                    Login
                                </div>
                            </div>)}
                        id="userLogin"
                        fullWidth
                        className="mb-4 ml-2"
                        defaultValue={'Carregando...'}
                    />

                    <TextField
                        disabled
                        label={(
                            <div className='d-flex justify-content-between' style={{ width: '94vw' }}>
                                <div className="d-flex justify-content-center align-items-center ajustFont">
                                    <FiLock className="mr-1" />
                                    Senha
                                </div>
                            </div>)}
                        id="userPassword"
                        fullWidth
                        type="password"
                        className="mb-4 ml-2"
                        defaultValue={'a'}
                    />
                </div>
            </div>

            <div className={darkMode ? "profile-container w-75 mb-4 backLightDark" : "profile-container w-75 mb-4"}>
                <div className="d-flex align-items-center justify-content-between">
                    <h3 className="mt-2 mb-1 ml-3 ">Dados pessoais </h3>
                    <FiEdit size={28} className="mt-2 mr-3" />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-wrap p-3">
                    {idType === 'cnpj' ?
                        <>
                            <TextField
                                disabled
                                label={(
                                    <div className='d-flex justify-content-between' style={{ width: '94vw' }}>
                                        <div className="d-flex justify-content-center align-items-center ajustFont">
                                            <FaRegBuilding className="mr-1" />
                                            Razão Social
                                        </div>
                                    </div>)}
                                fullWidth
                                id="razSoc"
                                type="tel"
                                className="mb-4 ml-2"
                                defaultValue={'Carregando...'}
                            />
                            <TextField
                                disabled
                                label={(
                                    <div className='d-flex justify-content-between' style={{ width: '94vw' }}>
                                        <div className="d-flex justify-content-center align-items-center ajustFont">
                                            <FiCreditCard className="mr-1" />
                                            Inscrição estadual
                                        </div>
                                    </div>)}
                                fullWidth
                                id="ie"
                                type="tel"
                                className="mb-4 ml-2"
                                defaultValue={'Carregando...'}
                            />
                        </> :
                        <></>}
                    <TextField
                        disabled
                        label={(
                            <div className='d-flex justify-content-between' style={{ width: '94vw' }}>
                                <div className="d-flex justify-content-center align-items-center ajustFont">
                                    <FiUser className="mr-1" />
                                    {idType === 'cpf' ? 'Nome completo' : 'Nome do representante'}
                                </div>
                            </div>)}
                        id="userName"
                        fullWidth
                        className="mb-4 ml-2"
                        defaultValue={'Carregando...'}
                    />

                    <TextField
                        disabled
                        label={(
                            <div className='d-flex justify-content-between' style={{ width: '94vw' }}>
                                <div className="d-flex justify-content-center align-items-center ajustFont">
                                    <FiMail className="mr-1" />
                                    E-mail
                                </div>
                            </div>)}
                        id="userEmail"
                        fullWidth
                        type="email"
                        autoComplete="email"
                        className="mb-4 ml-2"
                        defaultValue={'Carregando...'}
                    />

                    <TextField
                        disabled
                        label={(
                            <div className='d-flex justify-content-between' style={{ width: '94vw' }}>
                                <div className="d-flex justify-content-center align-items-center ajustFont">
                                    <FiPhone className="mr-1" />
                                    Contato
                                </div>
                            </div>)}
                        fullWidth
                        id="userCel"
                        type="tel"
                        className="mb-4 ml-2"
                        defaultValue={'Carregando...'}
                    />
                </div>
            </div>

            <div className={darkMode ? "profile-container w-75 mb-4 backLightDark" : "profile-container w-75 mb-4"}>
                <h2 className="mt-2 mb-3 ml-3">Endereços</h2>

                {loadAdresses.length === 3 ?
                    <></>
                    :
                    <button id="addAdress-btn" className="d-flex justify-content-center align-items-center mt-3 mb-3 ml-3" onClick={verifyAccountAdresses}>
                        Novo endereço
                        <FiPlus className="ml-1" />
                    </button>
                }

                <div id="teste">
                    {loadAdresses.length === 0 ?
                        <></> :
                        loadAdresses.map((item, index) => {
                            return (
                                <div key={index} className="pt-3 pr-3 pl-3 borderSolid adressesContainer">
                                    <h3 className="d-flex align-items-center justify-content-between">
                                        Endereço {index + 1}
                                        <FiEdit size={28} className="mt-2 mr-3" />
                                    </h3>
                                    <p><strong>CEP: </strong>{item.zipCode}</p>
                                    <p><strong>Nº: </strong>{item.number}</p>
                                    <p><strong>Rua: </strong>{item.street}</p>
                                    <p><strong>Cidade: </strong>{item.city}</p>
                                    <p><strong>UF: </strong>{item.uf}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}