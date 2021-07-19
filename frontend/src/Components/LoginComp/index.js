import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
    TextField
} from '@material-ui/core';

import api from '../../api'

import { FiUser, FiLock, FiMail, FiCreditCard, FiChevronLeft, FiPhone } from 'react-icons/fi';
import { FaRegBuilding } from 'react-icons/fa';

import Logo from '../../assets/3.png'

import $ from 'jquery'
import 'jquery-mask-plugin';

import Cookie from 'js-cookie'

import swal from 'sweetalert'
import Swal from 'sweetalert2';

export default function Form() {
    var history = useHistory();

    const [darkMode, setDarkMode] = useState();

    const [cpnjCpfCheck, setCnpjCpfCheck] = useState();
    const [passwordCheck, setPasswordCheck] = useState();

    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [cel, setCel] = useState();
    const [cpf, setCpf] = useState();
    const [password, setPassword] = useState();

    const [companyName, setCompanyName] = useState();
    const [companyCnpj, setCompanyCnpj] = useState();
    const [companyIe, setCompanyIe] = useState();
    const [companyPassword, setCompanyPassword] = useState();
    const [companyRepName, setCompanyRepName] = useState();
    const [companyRepEmail, setCompanyRepEmail] = useState();
    const [companyRepCel, setCompanyRepCel] = useState();

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("dark")))
    }, []);

    async function handleLogin(e) {

        e.preventDefault();

        var response = await api.get('/login', {
            headers: {
                documentToCheck: cpnjCpfCheck,
                passwordToCheck: passwordCheck
            }
        })

        if (response.data.id !== null) {

            Cookie.set('ID', response.data.id)
            Cookie.set('Type', response.data.type)

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
            })

            Toast.fire({
                icon: 'success',
                title: 'Logado com sucesso!'
            }).then(() => {
                history.push('/')
            })

        } else {
            swal({
                title: "Atenção",
                text: "Credencias incorretas",
                icon: "warning",
                dangerMode: true,
            })
        }
    }

    async function RegisterPF(e) {

        e.preventDefault();

        const data = {
            userName,
            email,
            cel,
            cpf,
            password
        }

        var response = await api.post('signup', data)

        switch (response.data.message) {
            case 'success':
                swal({
                    title: "Sucesso",
                    text: "Usuário cadastrado!",
                    icon: "success",
                    dangerMode: false,
                }).then(() => {
                    window.location.reload()
                });
                break;

            case 'cpf':
                swal({
                    title: "Houve um problema",
                    text: "CPF já cadastrado!",
                    icon: "warning",
                    dangerMode: true,
                })
                break;
            default:
                break;
        }
    }

    async function RegisterPJ(e) {
        e.preventDefault()

        const data = {
            userName: companyName,
            cnpj: companyCnpj,
            ie: companyIe,
            password: companyPassword,
            rep: {
                name: companyRepName,
                email: companyRepEmail,
                cel: companyRepCel
            }
        }

        var response = await api.post('companysignup', data)

        switch (response.data.message) {
            case 'success':
                swal({
                    title: "Sucesso",
                    text: "Empresa cadastrada!",
                    icon: "success",
                    dangerMode: false,
                }).then(() => {
                    window.location.reload()
                });
                break;

            case 'cnpj':
                swal({
                    title: "Houve um problema",
                    text: "CNPJ já cadastrado!",
                    icon: "warning",
                    dangerMode: true,
                })
                break;
            default:
                break;
        }
    }

    function showChooseRegisterType() {
        $("#loginForm,#forgotForm,#registerForm,#companyRegisterForm,#finalCompanyRegisterForm").fadeOut(0, () => {
            $("#chooseRegisterType").css({
                "display": "initial"
            })
        })
    }

    function showDarkCompanyRegister() {
        $("#chooseRegisterType").fadeOut(0, () => {
            $("#companyRegisterForm").css({
                "display": "initial"
            })
        })

        $("#registerBtn").css({
            "background": "#33345c",
            "color": "#fff "
        }).removeClass('textDark backLightDark')

        $("#loginBtn").css({
            "background": "#fff",
            "color": "#33345c"
        }).removeClass('textLightDark')
    }

    function showRegister() {

        $("#chooseRegisterType").fadeOut(0, () => {
            $("#registerForm").css({
                "display": "initial"
            })
        })

        $("#registerBtn").css({
            "background": "#fff",
            "color": "#33345c"
        })

        $("#loginBtn").css({
            "background": "#33345c",
            "color": "#fff"
        })

    }

    function showDarkRegister() {

        $("#chooseRegisterType").fadeOut(0, () => {
            $("#registerForm").css({
                "display": "initial"
            })
        })

        $("#registerBtn").css({
            "background": "#33345c",
            "color": "#fff "
        }).removeClass('textDark backLightDark')

        $("#loginBtn").css({
            "background": "#fff",
            "color": "#33345c"
        }).removeClass('textLightDark')

    }

    function showLogin() {
        $("#registerForm,#forgotForm,#chooseRegisterType,#companyRegisterForm,#finalCompanyRegisterForm").css({
            "display": "none"
        }, $("#loginForm").fadeIn(() => {
            $("#loginForm").css({
                'z-index': '1'
            })
        }))

        $("#loginBtn").css({
            "background": "#fff",
            "color": "#33345c"
        })

        $("#registerBtn").css({
            "background": "#33345c",
            "color": "#fff"
        })
    }

    function showDarkLogin() {
        $("#registerForm,#forgotForm,#chooseRegisterType,#companyRegisterForm,#finalCompanyRegisterForm").css({
            "display": "none"
        }, $("#loginForm").fadeIn(() => {
            $("#loginForm").css({
                'z-index': '1'
            })
        }))

        $("#loginBtn").css({
            "background": "#33345c",
            "color": "#fff"
        }).removeClass('textLightDark')

        $("#registerBtn").css({
            "background": "#fff",
            "color": "#33345c"
        }).removeClass('textDark backLightDark')
    }

    function showForgotPassword() {
        $("#loginForm").fadeOut(() => {
            $("#forgotForm").css({
                "display": "initial"
            })
        })
    }

    $('#registerCpf').mask('000.000.000-00')
    $('#registerCnpj').mask('00.000.000/0000-00')

    $("#registerName,#registerCompanyName,#registerNameRep").on("input", function () {
        var regexp = /[^a-zA-Z- ]/g;
        if (this.value.match(regexp)) {
            $(this).val(this.value.replace(regexp, ''));
        }
    });

    darkMode ?
        $("#loginCpfCnpj,#registerCelCP,#loginPswd,#registerName,#registerNameRep,#registerPhone,#registerEmailPF,#registerEmailCP,#registerCpf,#registerCnpj,#registerPswdPF,#registerPswdCP,#forgotEmail,#registerEstInsc,#registerRazSoc")
            .removeClass('textDark ')
            .addClass('textLightDark') :
        $("#loginCpfCnpj,#registerCelCP,#loginPswd,#registerName,#registerNameRep,#registerPhone,#registerEmailPF,#registerEmailCP,#registerCpf,#registerCnpj,#registerPswdPF,#registerPswdCP,#forgotEmail,#registerEstInsc,#registerRazSoc")
            .removeClass('textLightDark')
            .addClass('textDark')

    $(document).ready(function () {
        if (window.innerWidth < 1024) {
            $('#ajustMobileLogin').removeClass('grid')

            $("#logoAsideLogin").css('display', 'none')

            $(".formContainer").removeClass('d-flex justify-content-center align-items-center')

            $("#rightSide").css({
                'animation': 'none',
                'width': `${window.innerWidth}`,
                'padding': '20px'
            })

            window.location.pathname === '/login' ?
                $('body,html').css('overflow-y', 'hidden') :
                $('body,html').css('overflow-y', 'visible')
        }
    })

    return (

        <div className={darkMode ? "formContainer d-flex justify-content-center align-items-center backDark" : "formContainer d-flex justify-content-center align-items-center"}>

            <div id="ajustMobileLogin" className="grid">

                <div id="leftSide">

                    <button
                        id="homeBtn" className={darkMode ? "d-flex textLightDark hoverBorder" : "d-flex"}
                        onClick={() => {
                            history.push('/')
                        }}
                    >
                        <FiChevronLeft size={15} id="iconHome" />
                            Home
                    </button>

                    <img src={Logo} alt="BannerIMG" id="logoAsideLogin" />
                </div>

                <div id="rightSide">
                    <div className="d-flex justify-content-end mb-5">
                        <button
                            id="loginBtn"
                            onClick={darkMode ? showDarkLogin : showLogin}
                            className={darkMode ? 'textLightDark' : ''}
                        >
                            Entrar
                        </button>

                        <button
                            id="registerBtn"
                            onClick={showChooseRegisterType}
                            className={darkMode ? 'textDark backLightDark' : ''}
                        >
                            Registrar
                        </button>
                    </div>

                    <div className="ajustMlMobile d-flex ml-5">
                        <form id="loginForm" onSubmit={handleLogin}>

                            <h1 className={darkMode ? "m-0 p-0 textLightDark" : "m-0 p-0"}>Entrar</h1>

                            <TextField
                                required
                                placeholder="Digite aqui"
                                margin='normal'
                                label={<div className={darkMode ? 'textLightDark' : ''}><FiCreditCard /> CPF / CNPJ</div>}
                                fullWidth
                                type='tel'
                                id="loginCpfCnpj"
                                value={cpnjCpfCheck}
                                onChange={e => setCnpjCpfCheck(e.target.value)}
                            />

                            <TextField
                                required
                                fullWidth
                                margin='normal'
                                label={<div className={darkMode ? 'textLightDark' : ''}><FiLock /> Senha </div>}
                                type='password'
                                id="loginPswd"
                                placeholder='Nunca compartilhe sua senha com estranhos!'
                                value={passwordCheck}
                                onChange={e => setPasswordCheck(e.target.value)}

                            />

                            <button
                                type="submit"
                                className={darkMode ? "mt-4 w-100 p-2 mb-4 submitBtn textDark backLightDark" : "mt-4 w-100 p-2 mb-4 submitBtn"}
                            >
                                Entrar
                            </button>

                            <div className="d-flex justify-content-between psLoginContainer">
                                <p className={darkMode ? 'textLightDark' : ''} onClick={showForgotPassword}>Esqueceu sua senha?</p>
                                <p className={darkMode ? 'textLightDark' : ''} onClick={showChooseRegisterType}>Não possui uma conta?</p>
                            </div>

                        </form>

                        <div id="chooseRegisterType">
                            <h2 className={darkMode ? "m-0 p-0 textLightDark" : "m-0 p-0"}>Escolha o tipo de cadastro</h2>
                            <div id="btnsChooseContainer">
                                <button
                                    onClick={darkMode ? showDarkRegister : showRegister}
                                    className={darkMode ? 'backLightDark textDark chooseBtn mr-3' : 'mr-3 chooseBtn backDark textLightDark'}
                                >
                                    Pessoa Física
                            </button>

                                <button
                                    onClick={showDarkCompanyRegister}
                                    className={darkMode ? 'backLightDark textDark chooseBtn' : 'chooseBtn backDark textLightDark'}
                                >
                                    Empresa
                            </button>
                            </div>
                        </div>

                        <form id="registerForm" onSubmit={RegisterPF}>

                            <h1 className={darkMode ? "m-0 mb-2 p-0 textLightDark" : "m-0 mb-2 p-0"}>Registro de P. Física</h1>

                            <TextField
                                required
                                placeholder="Ex.: Augusto Ribeiro"
                                margin='normal'
                                label={<div className={darkMode ? 'textLightDark' : ''}><FiUser /> Nome completo</div>}
                                type='text'
                                fullWidth
                                className="p-0 m-0 mb-2"
                                id="registerName"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                            />

                            <TextField
                                required
                                placeholder="teste@gmail.com"
                                margin='normal'
                                label={<div className={darkMode ? 'textLightDark' : ''}><FiMail /> Email</div>}
                                type='email'
                                fullWidth
                                className="p-0 m-0 mb-2"
                                id="registerEmailPF"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <TextField
                                required
                                placeholder="(99) 99999-9999"
                                margin='normal'
                                label={<div className={darkMode ? 'textLightDark' : ''}><FiPhone /> Contato</div>}
                                fullWidth
                                className="p-0 m-0 mb-2"
                                id="registerPhone"
                                value={cel}
                                onChange={e => setCel(e.target.value)}
                            />

                            <TextField
                                required
                                placeholder="XXX-XXX-XXX-XX"
                                margin='normal'
                                label={<div className={darkMode ? 'textLightDark' : ''}><FiCreditCard /> CPF</div>}
                                type='tel'
                                fullWidth
                                className="p-0 m-0 mb-2"
                                id="registerCpf"
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                            />

                            <TextField
                                required
                                fullWidth
                                margin='normal'
                                label={<div className={darkMode ? 'textLightDark' : ''}><FiLock /> Senha</div>}
                                type='password'
                                className="p-0 m-0 mb-2"
                                id="registerPswdPF"
                                placeholder='Nunca compartilhe sua senha com estranhos!'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button type="submit" className={darkMode ? "mt-4 w-100 p-2 submitBtn textDark backLightDark" : "mt-4 w-100 p-2 submitBtn"}>Confimar</button>
                        </form>

                        <form onSubmit={RegisterPJ} >
                            <section id="companyRegisterForm">

                                <h1 className={darkMode ? "m-0 mb-2 p-0 textLightDark" : "m-0 mb-2 p-0"}>Registro de Empresa</h1>
                                <TextField
                                    required
                                    placeholder="Digite aqui ..."
                                    margin='normal'
                                    label={<div className={darkMode ? 'textLightDark' : ''}><FaRegBuilding /> Razão Social</div>}
                                    type='text'
                                    fullWidth
                                    className="p-0 m-0 mb-2"
                                    id="registerRazSoc"
                                    value={companyName}
                                    onChange={e => setCompanyName(e.target.value)}
                                />
                                <TextField
                                    required
                                    placeholder="Ex.: Augusto Silva"
                                    margin='normal'
                                    label={<div className={darkMode ? 'textLightDark' : ''}><FiUser /> Representante</div>}
                                    type='tel'
                                    fullWidth
                                    className="p-0 m-0 mb-2"
                                    id="registerNameRep"
                                    value={companyRepName}
                                    onChange={e => setCompanyRepName(e.target.value)}
                                />
                                <div className="d-flex">
                                    <div className="mr-3">
                                        <TextField
                                            required
                                            placeholder="XX.XXX.XXX/XXXX-XX"
                                            margin='normal'
                                            label={<div className={darkMode ? 'textLightDark' : ''}><FiCreditCard /> CNPJ</div>}
                                            type='tel'
                                            fullWidth
                                            className="p-0 m-0 mb-2"
                                            id="registerCnpj"
                                            value={companyCnpj}
                                            onChange={e => setCompanyCnpj(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            placeholder="Digite aqui"
                                            margin='normal'
                                            label={<div className={darkMode ? 'textLightDark' : ''}><FiCreditCard /> Inscrição estadual</div>}
                                            type='tel'
                                            fullWidth
                                            className="p-0 m-0 mb-2"
                                            id="registerEstInsc"
                                            value={companyIe}
                                            onChange={e => setCompanyIe(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            required
                                            placeholder="Ex.: teste@gmail.com"
                                            margin='normal'
                                            label={<div className={darkMode ? 'textLightDark' : ''}><FiMail /> E-mail</div>}
                                            type='email'
                                            fullWidth
                                            className="p-0 m-0 mb-2"
                                            id="registerEmailCP"
                                            value={companyRepEmail}
                                            onChange={e => setCompanyRepEmail(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            placeholder="Ex.: (19) 99999-9999"
                                            margin='normal'
                                            label={<div className={darkMode ? 'textLightDark' : ''}><FiPhone /> Contato</div>}
                                            type='tel'
                                            fullWidth
                                            className="p-0 m-0 mb-2"
                                            id="registerCelCP"
                                            value={companyRepCel}
                                            onChange={e => setCompanyRepCel(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <TextField
                                    required
                                    fullWidth
                                    margin='normal'
                                    label={<div className={darkMode ? 'textLightDark' : ''}><FiLock /> Senha</div>}
                                    type='password'
                                    className="p-0 m-0 mb-2"
                                    placeholder='Nunca compartilhe sua senha com estranhos!'
                                    id="registerPswdCP"
                                    value={companyPassword}
                                    onChange={e => setCompanyPassword(e.target.value)}
                                />
                                <button type="submit" className={darkMode ? "mt-4 w-100 p-2 submitBtn textDark backLightDark" : "mt-4 w-100 p-2 submitBtn"}>Confirmar</button>
                            </section>
                        </form>

                        <form id="forgotForm" onSubmit={() => alert('manda email')}>
                            <h1 className={darkMode ? "m-0 mb-2 p-0 textLightDark" : "m-0 mb-2 p-0"}>Recuperação de conta</h1>

                            <TextField
                                placeholder="teste@gmail.com"
                                margin='normal'
                                label={<div className={darkMode ? 'textLightDark' : ''}><FiMail /> Email</div>}
                                type='email'
                                fullWidth
                                className="p-0 m-0 mb-2"
                                id="forgotEmail"
                            />

                            <button type="submit" className={darkMode ? "mt-4 w-100 p-2 submitBtn textDark backLightDark" : "mt-4 w-100 p-2 submitBtn"}>Recuperar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}