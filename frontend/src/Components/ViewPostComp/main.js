import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBolt, FaCheckSquare, FaClipboardCheck, FaComment, FaCouch, FaEnvelopeSquare, FaInfinity, FaPaw, FaPhoneSquareAlt, FaTshirt, FaUserCircle, FaUtensils } from 'react-icons/fa'
import { FiArrowLeftCircle, FiMoreHorizontal } from 'react-icons/fi';
import { MenuList, MenuItem, CircularProgress } from '@material-ui/core';

import api from '../../api';

export default function Main({ id, postTitle }) {

    const [darkMode, setDarkMode] = useState();

    const [viewPostInfo, setViewPostInfo] = useState({});
    const [postOwnerData, setPostOwnerData] = useState({});

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("dark")))
        api.get('/showViewPost', {
            headers: {
                _id: id
            }
        }).then((res) => {
            setViewPostInfo(res.data);

            api.get('/allUsers').then((result) => {
                const data = result.data.filter(user => {
                    return user._id === res.data.ownerId
                })
                setPostOwnerData(data)
            })
        })
    }, [id]);

    const ShowIcon = () => {
        switch (postTitle) {
            case 'food':
                return <FaUtensils className="mt-4" />
            case 'clothes':
                return <FaTshirt className="mt-4" />
            case 'eletronic':
                return <FaBolt className="mt-4" />
            case 'furniture':
                return <FaCouch className="mt-4" />
            case 'pets':
                return <FaPaw className="mt-4" />
            case 'varied':
                return <FaInfinity className="mt-4" />
            default:
                break;
        }
    }

    const loadImage = () => {

        if (viewPostInfo.image) {
            return <img alt="Post" className="postImage" src={viewPostInfo.image} />
        }

        do {
            return <>
                <CircularProgress size={40} color="secondary" />
            </>
        } while (!viewPostInfo.image)
    }

    const loadPostInfoComponent = () => {
        if ((viewPostInfo) && (postOwnerData.length > 0)) {
            return <div className={darkMode ? "infoPostContainer backLightDark" : "infoPostContainer"}>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="d-flex align-items-center mt-2 mb-0 ">
                        <p id="iconTitle">
                            <ShowIcon />
                        </p>
                        <p id="postTitlePub" className="m-0 ml-2 mt-3 mb-1">{viewPostInfo.caseName}</p>
                    </h2>

                    <div className="header navbar navbar-expand-lg p-0 ">
                        <ul className="navbar-nav">
                            <li className="dropdown-filter">
                                <Link className="nav-link dropdown-toggle removeListArrow" to="#" data-toggle="dropdown" style={{ color: '#33345c' }}>
                                    <FiMoreHorizontal size={30} />
                                </Link>
                                <MenuList className="dropdown-menu drop-filter">
                                    <MenuItem className="dropdown-item">
                                        Denunciar publicação
                                    </MenuItem>
                                </MenuList>
                            </li>
                        </ul>
                    </div>
                </div>
                <p>
                    <strong style={{ fontSize: 18 }}>Descrição:</strong>
                    <p id="postDescriptionPub" className="mt-2">{viewPostInfo.description}</p>
                </p>
                <div className="mt-4 mb-4 ml-2 mr-2 d-flex align-items-center justify-content-between profileSection">
                    <div className="profileMainInfo d-flex align-items-center">
                        <FaUserCircle size={25} className="mr-1" />
                        <p className="m-0" id="ownerName">{postOwnerData[0].userName.substring(0, 19) + '.'}</p>
                        <small className="ml-2 mt-1" id="postTime"> • 2h</small>
                    </div>
                    <div>
                        <button className="submitBtn d-flex align-items-center justify-content-center pl-2 pr-2 pt-1 pb-1"><FaComment className="mr-2" />Enviar mensagem</button>
                    </div>
                </div>
                <h3 className="mb-3">Informações</h3>
                <div className="pl-2 pr-2 d-block justify-content-between align-items-center flex-wrap">
                    <p>
                        <strong>
                            <FaCheckSquare size={20} className="mr-1 mb-1" />
                                Disponibilidade:
                        </strong>
                        <span className="ml-1 postInfo" id="postDisponibility">{viewPostInfo.disponibility}</span>
                    </p>
                    <p>
                        <strong>
                            <FaPhoneSquareAlt size={20} className="mr-1 mb-1" />
                            Contato:
                        </strong>
                        <span className="ml-1 postInfo" id="postTel">{postOwnerData[0].cpf ? postOwnerData[0].cel : postOwnerData[0].rep.cel}</span>
                    </p>
                    <p>
                        <strong>
                            <FaEnvelopeSquare size={20} className="mr-1 mb-1" />
                            E-mail:
                        </strong>
                        <span className="ml-1 postInfo" id="postEmail">{postOwnerData[0].cpf ? postOwnerData[0].email : postOwnerData[0].rep.email}</span>
                    </p>
                </div>
                <button className="submitBtn btnSendMessage d-flex align-items-center justify-content-center"><FaClipboardCheck size={20} className="mr-1" />Preciso</button>
            </div>
        }

        do {
            return <div className="d-flex justify-content-center align-items-center"><CircularProgress size={40} color="secondary" /></div>
        } while ((!viewPostInfo) && (postOwnerData.length === 0))
    }

    return (
        <div className={darkMode ? "centered animationViewPost backDark" : "centered animationViewPost"}>
            <div className={darkMode ? "container p-0 viewPostContainer backLightDark" : "container p-0 viewPostContainer"}>
                <div className={darkMode ? "PostImgsContainer mt-3 backLightDark" : "PostImgsContainer mt-3"}>
                    <Link to='/' className="arrowBack">
                        <FiArrowLeftCircle size={30} />
                    </Link>
                    <p className="postTypeBanner" >
                        {viewPostInfo.publicationType}
                    </p>
                    <div className="bannerIMG">
                        {loadImage()}
                    </div>
                </div>
                {loadPostInfoComponent()}
            </div>
        </div>
    )
}
