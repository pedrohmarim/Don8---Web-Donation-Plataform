import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import UserList from './userList'

import LightLogo from '../../assets/lightLogo.png';
import DarkLogo from '../../assets/darkLogo.png';
import Cookie from 'js-cookie'

import { SidebarData } from './CompDatas';

import { FaUserCircle } from 'react-icons/fa';
import { FiMenu, FiX, FiBell, FiMessageCircle, FiUser, FiSettings, FiLogOut, FiEdit } from 'react-icons/fi';
import { CircularProgress } from '@material-ui/core';

export default function Header({ change, loginToken, loggedUserName }) {

    const [darkMode, setDarkMode] = useState();

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("dark")))
    }, []);

    $(document).ready(function () {
        if (window.location.pathname === '/') {
            $("#donationItem").addClass('ActiveItem')
        }

        change ? $(".haveChangeColor").removeClass('colorHeaderSolid').addClass('colorHeader') : $(".haveChangeColor").removeClass('colorHeader').addClass('colorHeaderSolid')
        change ? $(".changeLoginBtnColor").removeClass('colorHeaderSolid').addClass('colorHeader') : $(".changeLoginBtnColor").removeClass('colorHeader').addClass('colorHeaderSolid')
        change ? $(".changeRegisterBtnColor").css({
            "color": "#33345c",
            "background": "#fff"
        }) : $(".changeRegisterBtnColor").css({
            "color": "#fff",
            "background": "#33345c"
        })

        change ?
            $(".headerItem").removeClass('colorHeaderSolid').addClass('colorHeader') :
            $(".headerItem").removeClass('colorHeader').addClass('colorHeaderSolid')


        darkMode ?
            $(".headerHome").addClass('backDark') :
            $(".headerHome").removeClass('backDark')

        darkMode ?
            $(".headerItem").removeClass('colorHeaderSolid colorHeader').addClass('textLightDark') :
            $(".headerItem").removeClass('textLightDark')

    })

    const loadComp = () => {
        if (Cookie.get('ID') === undefined) {
            return <div className="d-flex align-items-center">
                <Link to="/login" >
                    <button id="loginBtn" className={darkMode ? 'backDark textLightDark' : "changeLoginBtnColor"}>Entrar</button>
                </Link>
                <Link to="/login">
                    <button id="registerBtn" className={darkMode ? 'backLightDark textDark' : "changeRegisterBtnColor"}>Registrar</button>
                </Link>
            </div>
        }

        if (loginToken) {
            return <UserList loggedUserName={loggedUserName} />
        }

        do {
            return <CircularProgress size={40} color="secondary" />
        } while (!loginToken)
    }

    //MOBILE HEADER DATA

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    if (window.location.pathname === '/') {
        SidebarData[0].cName = 'nav-text mobileItemActive'
        SidebarData[1].cName = 'nav-text'
    }

    function toggleMobileList() {
        $("#mobilelist-container").toggleClass('hidden')
    }

    function toggleModal() {
        $('html, body').animate({ scrollTop: 0 });
        $("#FirstmodalContainer").toggleClass('toggleModal')
        $("body").toggleClass('hiddenScroll')
    }

    return (
        <>
            {/*HEADER MOBILE */}

            <div className="mobile-header">
                <div className='navbarMobile'>
                    <Link to='#' className='menu-bars'>
                        <FiMenu onClick={showSidebar} />
                        <img src={DarkLogo} alt="Logo Mobile" height='60' />
                        <FaUserCircle onClick={toggleMobileList} />
                    </Link>

                    <ul id="mobilelist-container" className="hidden">

                        <li onClick={toggleModal}>
                            <Link to='#'>
                                <FiEdit className="mr-1" size={25} />Publicar
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <FiBell className="mr-1" size={25} /> Notificações
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <FiMessageCircle className="mr-1" size={25} /> Mensagens
                            </Link>
                        </li>
                        <li>
                            <Link to='/profile'>
                                <FiUser className="mr-1" size={25} />Conta
                            </Link>
                        </li>
                        <li>
                            <Link to='/settings'>
                                <FiSettings className="mr-1" size={35} /> Configurações
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <FiLogOut className="mr-1" size={25} /> Sair
                            </Link>
                        </li>
                    </ul>

                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars' style={{ justifyContent: 'space-between', padding: '0 5px' }}>
                                <img src={DarkLogo} alt="Logo Mobile" height='65' />
                                <FiX />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName} >
                                    <Link to={item.path} >
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/*HEADER DESKTOP */}
            <div className={change ? 'headerHome d-flex justify-content-between pl-3 pr-3 solidHeader' : 'headerHome d-flex justify-content-between pl-3 pr-3'}>
                <div className="d-flex justify-content-start align-items-center">
                    <Link to="/"> <img src={change || darkMode ? LightLogo : DarkLogo} height="65" className="mr-5 mt-2 mb-2" alt="Logo Don8)" /></Link>
                    <Link to="/">
                        <span id="donationItem" className='p-0 m-0 mr-3 headerItem'>Início</span>
                    </Link>
                    <Link to="#">
                        <span id="aboutUs" className='p-0 m-0 mr-3 headerItem'>Sobre nós</span>
                    </Link>
                    <Link to="#">
                        <span id="talktousItem" className='p-0 m-0 mr-3 headerItem'>Suporte</span>
                    </Link>
                    <Link to="#">
                        <span id="helpItem" className='p-0 m-0 mr-3 headerItem'>Ajuda</span>
                    </Link>
                </div>
                <div className="d-flex justify-content-start align-items-center ">
                    {loadComp()}
                </div>
            </div>
        </>
    )

}