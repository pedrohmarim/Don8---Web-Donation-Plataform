import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'

import { FiBell, FiMessageCircle, FiUser, FiSettings, FiLogOut, FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import $ from 'jquery';

import Cookie from 'js-cookie';

import { CircularProgress } from '@material-ui/core';

import {
    MenuList,
    MenuItem,
} from '@material-ui/core';

import { Messages } from './CompDatas'

export default function UserList({ loggedUserName }) {

    var history = useHistory();

    function toggleModal() {
        $("#animationPosts").toggleClass('static')
        $('html, body').animate({ scrollTop: 0 });
        $("#FirstmodalContainer").toggleClass('toggleModal')
        $("body").toggleClass('hiddenScroll')
    }

    const [darkMode, setDarkMode] = useState();

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("dark")))
    }, []);

    darkMode ?
        $('.textHeader').addClass('textLightDark') :
        $('.textHeader').addClass('haveChangeColor')

    function logout() {
        Cookie.remove('ID', 'value')
        Cookie.remove('Type', 'value')
        history.push('/')
    }

    return (
        <div className="header navbar navbar-expand-lg">
            <div id="iconsHeader" className="d-flex align-items-center">
                <ul className="navbar-nav">

                    <li className="dropdown">
                        <Link className="nav-link haveChangeColor textHeader" to="#" data-toggle="dropdown">
                            <FiBell size={25} className="haveChangeColor textHeader" />
                        </Link>
                    </li>

                    <li className="dropdown">
                        <Link className="nav-link haveChangeColor textHeader" to="#" data-toggle="dropdown">
                            <FiMessageCircle size={25} className="haveChangeColor textHeader" />
                        </Link>

                        <MenuList className="dropdown-menu" style={{ left: -110 }}>
                            {Messages.map((item, index) => {
                                return (
                                    <MenuItem className="dropdown-item pl-2" key={index} style={{ borderBottom: 'solid 1px #0000004b' }}>
                                        <img src={item.profileImage} alt="Profile" height="55" style={{ borderRadius: '50%' }} />
                                        <div className="ml-2 w-100">
                                            <div className="d-flex justify-content-between">
                                                <p className="m-0">{item.ownerName}</p>
                                                <p className="m-0">{item.date}</p>
                                            </div>
                                            <div>
                                                <p className="font-weight-normal m-0">
                                                    {item.content.length > 25 ?
                                                        item.content.substring(0, 25) + '...' :
                                                        item.content
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>
                                )
                            })}
                            <MenuItem className="dropdown-item justify-content-center">
                                <p className="m-0 pt-0 pb-0 font-weight-bold">Ver todos</p>
                            </MenuItem>
                        </MenuList>
                    </li>

                    <li className="dropdown">
                        <Link className="nav-link dropdown-toggle haveChangeColor textHeader" to="#" data-toggle="dropdown">
                            <span className="haveChangeColor textHeader">
                                {loggedUserName === '' || loggedUserName === ' undefined' ?
                                    <CircularProgress color="secondary" size={25} />
                                    : loggedUserName}
                            </span>
                        </Link>

                        <MenuList className="dropdown-menu userListDropdown">

                            <div onClick={toggleModal}>
                                <MenuItem className="dropdown-item" >
                                    <FiEdit className="mr-1" size={25} />Publicar
                                </MenuItem>
                            </div>

                            <Link to="/profile" >
                                <MenuItem className="dropdown-item" >
                                    <FiUser className="mr-1" size={25} />Conta
                                </MenuItem>
                            </Link>

                            <Link to='/settings'>
                                <MenuItem className="dropdown-item">
                                    <FiSettings className="mr-1" size={25} /> Configurações
                                </MenuItem>
                            </Link>

                            <Link to="/" onClick={logout}>
                                <MenuItem className="dropdown-item">
                                    <FiLogOut className="mr-1" size={25} /> Sair
                                </MenuItem>
                            </Link>
                        </MenuList>
                    </li>
                </ul>
            </div>
        </div>
    )
}