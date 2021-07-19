import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FiXCircle, FiEdit, FiArrowLeftCircle, FiUpload, FiTrendingUp, FiTrendingDown, FiTrash, FiPlus } from 'react-icons/fi';
import { FaThumbsUp, FaThumbsDown, FaUtensils, FaBolt, FaTshirt, FaCouch, FaQuestion, FaPaw, FaInfinity } from 'react-icons/fa';
import { MenuItem, InputLabel, FormControl, Select, TextField } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import $ from 'jquery';
import 'jquery-mask-plugin';

import Cookie from 'js-cookie';
import api from '../../api';

import Swal from 'sweetalert2';

export default function ModalPost() {

    const [darkMode, setDarkMode] = useState();

    const _id = Cookie.get('ID', 'value');
    const idType = Cookie.get('Type', 'value');

    const [loadAdresses, setLoadAdresses] = useState([{}])

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("dark")))

        switch (idType) {
            case 'cpf':
                api.get('/user', {
                    headers: {
                        _id
                    }
                }).then((res) => {
                    setLoadAdresses(res.data.address)
                })
                break;
            case 'cnpj':
                api.get('/company', {
                    headers: {
                        _id
                    }
                }).then((res) => {
                    setLoadAdresses(res.data.address)
                })
                break;
            default:
                break;
        }
    }, [_id, idType]);

    const useStyles = makeStyles(() => ({
        formControl: {
            maxWidth: 320,
            marginTop: 20,
        },
    }));

    const classes = useStyles();

    const [category, setCategory] = React.useState('');
    const [openCategory, setopenCategory] = React.useState(false);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleCategoryClose = () => {
        setopenCategory(false);
    };

    const handleCategoryOpen = () => {
        setopenCategory(true);
    };

    const [type, setType] = React.useState('');
    const [openType, setopenType] = React.useState(false);

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleTypeClose = () => {
        setopenType(false);
    };

    const handleTypeOpen = () => {
        setopenType(true);
    };

    const [availability, setAvailability] = React.useState('');
    const [openAvailability, setopenAvailability] = React.useState(false);

    const handleAvailabilityChange = (event) => {
        setAvailability(event.target.value);
    };

    const handleAvailabilityClose = () => {
        setopenAvailability(false);
    };

    const handleAvailabilityOpen = () => {
        setopenAvailability(true);
    };

    function toggleModal() {
        $("#animationPosts").toggleClass('static')
        $('html, body').animate({ scrollTop: 0 });
        $("#FirstmodalContainer").toggleClass('toggleModal')
        $("body").toggleClass('hiddenScroll')
        setCategory('')
        setAvailability('')
        setType('')
        setTitle('')
        setDescription('')
        setLoadedImage('')
    }

    function backModal() {

        if ((availability === 'Não posso buscar') || availability === 'Não posso entregar') {
            $("#finalmodalContainer").removeClass('toggleModal')
            $("#adressContainer").css('display', 'initial')
            $(".modalInfo").css({
                'left': '32%'
            })
        } else {
            $("#finalmodalContainer").removeClass('toggleModal')
            $("#adressContainer").css('display', 'initial')
        }
    }

    function toFinalModal() {

        if ((availability === 'Não posso buscar') || availability === 'Não posso entregar') {

            if (($("#descriptionArea").val() === '') || $("#postTitle").val() === '') {

                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Título ou Descrição inválidos!',
                })

            } else {

                $("#adressContainer").css('display', 'none')
                $("#finalmodalContainer").addClass('toggleModal')
                $(".modalInfo").css({
                    'left': '50%'
                })

            }

        } else {
            if (($("#defaultPostTitle").val().length === 0) || ($("#defaultDescripition").val().length === 0)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Título ou descrição da publicação inválido!',
                })
            } else {
                $("#adressContainer").css('display', 'none')
                $("#finalmodalContainer").addClass('toggleModal')
            }
        }
    }
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function HandlePost() {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Tem certeza?',
            text: "Sua postagem será publicada",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, publicar',
            cancelButtonText: 'Não, cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                const data = {
                    caseName: title,
                    description: description,
                    publicationCategory: category,
                    publicationType: type,
                    disponibility: availability,
                    image: loadedImage,
                    ownerId: Cookie.get('ID', 'value')
                }

                api.post('/case', data).then(() => {
                    swalWithBootstrapButtons.fire(
                        'Sucesso!',
                        'Sua postagem foi publicada',
                        'success'
                    )
                    setLoadedImage('')
                    setPostImageDeleted(true)
                    $(".images-container").children().css('display', 'none')
                    $(".uploadArrow").css("display", "initial")
                    toggleModal()
                    backModal()
                    setCategory('')
                    setAvailability('')
                    setType('')
                    setTitle('')
                    setDescription('')
                })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) { }
        })
    }

    $(document).ready(function () {
        if (window.innerWidth > 800) {
            if (((availability === 'Não posso entregar') || (availability === 'Não posso buscar')) && (postImageDeleted === false)) {
                $("#adressContainer").css('display', 'initial')
                $(".modalInfo").css({
                    'left': '32%'
                })
            } else {
                $("#adressContainer").css('display', 'none')
                $(".modalInfo").css({
                    'left': '50%'
                })
            }
        }

        $('.addressMap').on('click', function () {

            if (darkMode) {
                $('.addressMap').removeClass('selectedAddressDark')
                $(this).addClass('selectedAddressDark')
            }

            $('.addressMap').removeClass('selectedAddress')
            $(this).addClass('selectedAddress')

            if (window.innerWidth < 800) {
                $("#adressContainer").animate({
                    'left': '150%'
                }, 1500)
            }
        })

        darkMode ?
            $('.MuiSelect-select,#postTitle,#defaultPostTitle').removeClass('textDark').addClass('textLightDark') :
            $('.MuiSelect-select,#postTitle,#defaultPostTitle').removeClass('textLightDark').addClass('textDark')


    })

    const [loadedImage, setLoadedImage] = useState('')
    const [postImageDeleted, setPostImageDeleted] = useState(false);

    async function loadPreviewImage() {

        const { value: file } = await Swal.fire({
            title: 'Selecione uma imagem',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Selecione sua imagem'
            }
        })

        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setLoadedImage(event.target.result)
                setPostImageDeleted(true)
                $(".uploadArrow").css("display", "none")
                $($.parseHTML("<img>"))
                    .attr("src", event.target.result)
                    .appendTo($(".images-container"))
                    .css({ "width": "100%", "height": "250px", "padding": "10px" })
            }
            reader.readAsDataURL(file)
        }
    }

    if (window.innerWidth < 800) {
        $('.modalInfo').width(window.innerWidth / 1.05)
    }

    function showReconfirmAddress() {
        $("#adressContainer").css({
            'left': '0%'
        })
    }

    const loadAddressComp = () => {
        if (loadAdresses.length === 0) {
            return <div id="adressContainer" style={darkMode ? { background: '#23233d' } : { background: '#d4d4d4' }}>
                <div id="cardBackground" className={darkMode ? 'backDark m-3 pt-2 pr-3 pl-3 pb-2' : "m-3 pt-2 pr-3 pl-3 pb-2"}>
                    <h2 className={darkMode ? "text-left mt-2 textLightDark d-flex flex-wrap" : "text-left mt-2 textDark d-flex flex-wrap"}>
                        Endereço de {availability === 'Não posso buscar' ? 'entrega' : 'retirada'}
                        <small style={{ fontSize: 18, marginTop: 15 }}>Nenhum endereço cadastrado.</small>
                    </h2>
                    <Link to='/newAddress'>
                        <button id="addAdress-btn" className="d-flex justify-content-center align-items-center mt-3 mb-2">
                            Novo endereço
                            <FiPlus className="ml-1" />
                        </button>
                    </Link>
                </div>
            </div>
        }

        if (loadAdresses.length > 0) {
            return <div id="adressContainer" style={darkMode ? { background: '#23233d' } : { background: '#d4d4d4' }}>
                <div id="cardBackground" className={darkMode ? 'backDark m-3 pt-2 pr-3 pl-3 pb-2' : "m-3 pt-2 pr-3 pl-3 pb-2"}>
                    <h2 className={darkMode ? "text-left mt-2 textLightDark" : "text-left mt-2 textDark"}>
                        Endereço de {availability === 'Não posso buscar' ? 'entrega' : 'retirada'}
                        {loadAdresses.map((item, index) => {
                            return (
                                <label key={index} className="addressMap d-flex" style={{ borderColor: darkMode ? '#ffffff3f' : '#33345c88' }} htmlFor={index} >
                                    <div>
                                        <p className={darkMode ? 'textLightDark' : 'textDark'}>
                                            CEP:
                                            <span className={darkMode ? 'textLightDark font-weight-normal' : 'font-weight-normal textDark'}> {item.zipCode}</span>
                                        </p>
                                        <p className={darkMode ? 'textLightDark' : 'textDark'}>
                                            Rua:
                                            <span className={darkMode ? 'textLightDark font-weight-normal' : 'font-weight-normal textDark'}> {item.street}</span>
                                        </p>
                                        <p className={darkMode ? 'textLightDark' : 'textDark'}>
                                            Bairro:
                                            <span className={darkMode ? 'textLightDark font-weight-normal' : 'font-weight-normal textDark'}> {item.block}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className={darkMode ? 'textLightDark' : 'textDark'}>
                                            Cidade:
                                            <span className={darkMode ? 'textLightDark font-weight-normal' : 'font-weight-normal textDark'}> {item.city}</span>
                                        </p>
                                        <p className={darkMode ? 'textLightDark' : 'textDark'}>
                                            UF:
                                            <span className={darkMode ? 'textLightDark font-weight-normal' : 'font-weight-normal textDark'}> {item.uf}</span>
                                        </p>
                                        <p className={darkMode ? 'textLightDark' : 'textDark'}>
                                            Número:
                                            <span className={darkMode ? 'textLightDark font-weight-normal' : 'font-weight-normal textDark'}> {item.number}</span>
                                        </p>
                                    </div>
                                    <input type='radio' id={index} name="chooseAddress" />
                                </label>
                            )
                        })}
                    </h2>
                </div>
            </div>
        }
    }

    return (
        <>
            <div id="FirstmodalContainer" className="modalContainer">
                <div className={darkMode ? "modalInfo backDark " : "modalInfo"}>
                    <div className={darkMode ? "darkBorder borderActive d-flex justify-content-between" : "borderActive d-flex justify-content-between"}>
                        <h2 className={darkMode ? "mt-3 pb-1 textLightDark" : "mt-3 pb-1"}><FiEdit className="mr-1 mb-2" size={30} />Criar publicação</h2>
                        <h2 className={darkMode ? "mt-3 pb-1 textLightDark" : "mt-3 pb-1"}><FiXCircle id="btnCloseModal" onClick={toggleModal} /></h2>
                    </div>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label" className={darkMode ? 'textLightDark' : ''}>Categoria da publicação</InputLabel>
                        <Select
                            style={{ textAlign: 'left' }}
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openCategory}
                            onClose={handleCategoryClose}
                            onOpen={handleCategoryOpen}
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value="food" style={{ color: '#33345c' }}><FaUtensils className="mr-1" /> Alimentos</MenuItem>
                            <MenuItem value="clothes" style={{ color: '#33345c' }}><FaTshirt className="mr-1" />Roupas</MenuItem>
                            <MenuItem value="eletronics" style={{ color: '#33345c' }}><FaBolt className="mr-1" />Eletrônicos</MenuItem>
                            <MenuItem value="furniture" style={{ color: '#33345c' }}><FaCouch className="mr-1" />Móveis</MenuItem>
                            <MenuItem value="pets" style={{ color: '#33345c' }}><FaPaw className="mr-1" />Pets</MenuItem>
                            <MenuItem value="varied" style={{ color: '#33345c' }}><FaInfinity className="mr-1" />Variados</MenuItem>
                        </Select>
                    </FormControl>

                    {(category !== '') ?
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label" className={darkMode ? 'textLightDark' : ''}>Tipo da publicação</InputLabel>
                            <Select
                                style={{ textAlign: 'left' }}
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={openType}
                                onClose={handleTypeClose}
                                onOpen={handleTypeOpen}
                                value={type}
                                onChange={handleTypeChange}
                            >
                                <MenuItem value="Doando" style={{ color: '#33345c' }}><FiTrendingUp className="mr-1" /> Doando</MenuItem>
                                <MenuItem value="Precisando" style={{ color: '#33345c' }}><FiTrendingDown className="mr-1" />Precisando</MenuItem>
                            </Select>
                        </FormControl> : <div></div>

                    }

                    {(type === "Precisando") ?
                        <FormControl fullWidth className={classes.formControl} >
                            <InputLabel id="demo-controlled-open-select-label" className={darkMode ? 'textLightDark' : ''}>Disponibilidade</InputLabel>
                            <Select
                                style={{ textAlign: 'left' }}
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={openAvailability}
                                onClose={handleAvailabilityClose}
                                onOpen={handleAvailabilityOpen}
                                value={availability}
                                onChange={handleAvailabilityChange}
                            >
                                <MenuItem value="Posso buscar" style={{ color: '#33345c' }}><FaThumbsUp className="mr-1" /> Posso buscar</MenuItem>
                                <MenuItem value="Não posso buscar" style={{ color: '#33345c' }}><FaThumbsDown className="mr-1" />Não posso buscar</MenuItem>
                                <MenuItem value="A decidir" style={{ color: '#33345c' }}><FaQuestion className="mr-1" />A decidir </MenuItem>
                            </Select>
                        </FormControl>
                        : (type === "Doando") ?
                            <FormControl fullWidth className={classes.formControl} >
                                <InputLabel id="demo-controlled-open-select-label" className={darkMode ? 'textLightDark' : ''}>Disponibilidade</InputLabel>
                                <Select
                                    style={{ textAlign: 'left' }}
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={openAvailability}
                                    onClose={handleAvailabilityClose}
                                    onOpen={handleAvailabilityOpen}
                                    value={availability}
                                    onChange={handleAvailabilityChange}
                                >
                                    <MenuItem value="Posso entregar" style={{ color: '#33345c' }}><FaThumbsUp className="mr-1" /> Posso entregar</MenuItem>
                                    <MenuItem value="Não posso entregar" style={{ color: '#33345c' }}><FaThumbsDown className="mr-1" />Não posso entregar</MenuItem>
                                    <MenuItem value="A decidir" style={{ color: '#33345c' }}><FaQuestion className="mr-1" />A decidir </MenuItem>
                                </Select>
                            </FormControl>
                            :
                            <div></div>
                    }

                    {((availability === 'Não posso entregar') || (availability === 'Não posso buscar')) ?

                        <div>

                            <button onClick={showReconfirmAddress} className={darkMode ? "addressMobileBtn textDark backLightDark" : "backDark textLightDark addressMobileBtn"}>Endereço</button>

                            <div id="textareaContainer" className='mt-2'>
                                <TextField
                                    id="postTitle"
                                    name="Título da publicação"
                                    style={window.innerWidth < 800 ? { width: '93%', marginTop: 10 } : { width: '80%', marginTop: 10 }}
                                    placeholder="Digite aqui"
                                    label={<div className={darkMode ? 'textLightDark' : ''}>Título da publicação</div>}
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                                <h6 style={window.innerWidth < 800 ? { marginLeft: 13 } : { marginLeft: 38 }} className={darkMode ? 'textLightDark' : ''}>Descrição da publicação</h6>
                                <textarea
                                    id="descriptionArea"
                                    className={darkMode ? "textLightDark backDark" : ''}
                                    placeholder="Sua descrição aqui..."
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>

                            <button className={darkMode ? 'btnPublNext textDark backLightDark' : 'btnPublNext'} onClick={toFinalModal}>Continuar</button>

                            {loadAddressComp()}
                        </div>
                        : (availability !== '' && availability !== 'Não posso entregar') ?
                            <div>
                                <div id="textareaContainer" className='mt-2'>
                                    <TextField
                                        id="defaultPostTitle"
                                        style={window.innerWidth < 800 ? { width: '93%', marginTop: 10 } : { width: '80%', marginTop: 10 }}
                                        placeholder="Digite aqui"
                                        label={<div className={darkMode ? 'textLightDark' : ''}>Título da publicação</div>}
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                    <h6 style={window.innerWidth < 800 ? { marginLeft: 13 } : { marginLeft: 38 }} className={darkMode ? 'textLightDark' : ''}>Descrição da publicação</h6>
                                    <textarea
                                        className={darkMode ? "textLightDark backDark" : ''}
                                        placeholder="Sua descrição aqui..."
                                        id="defaultDescripition"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                                <button className={darkMode ? 'btnPublNext textDark backLightDark' : 'btnPublNext'} onClick={toFinalModal}>Continuar</button>
                            </div>
                            :
                            <div></div>
                    }
                </div>
            </div>

            <div id="finalmodalContainer" className="modalContainer">
                <div id="finalmodalInfo" className={darkMode ? "modalInfo backDark" : "modalInfo"}>
                    <div className={darkMode ? "darkBorder borderActive d-flex justify-content-between" : "borderActive d-flex justify-content-between "}>
                        <h2 className={darkMode ? "mt-3 pb-1 textLightDark" : "mt-3 pb-1"}><FiEdit className="mr-1 mb-2" size={30} />Criar publicação</h2>
                        <h2 className={darkMode ? "mt-3 pb-1 textLightDark" : "mt-3 pb-1"}><FiArrowLeftCircle id="btnCloseModal" onClick={backModal} /></h2>
                    </div>

                    <div
                        onSubmit={HandlePost}
                        className={darkMode ? "w-75 mr-auto ml-auto mt-5 d-flex flex-wrap uploadImgContainer textLightDark" : "w-75 mr-auto ml-auto mt-5 d-flex flex-wrap uploadImgContainer"}
                    >
                        <div
                            className={darkMode ? "w-100 d-flex justify-content-between align-items-center" : "w-100 d-flex justify-content-between align-items-center"}
                            id="input-files"
                        >
                            <h3
                                onClick={loadedImage === '' ? loadPreviewImage : undefined}
                                className={darkMode ? 'textLightDark cursor' : 'cursor'}
                            >Enviar imagem</h3>
                            {loadedImage === '' ?
                                <></> :
                                <FiTrash
                                    className="cursor"
                                    size={25}
                                    color="red"
                                    onClick={() => {
                                        setLoadedImage('')
                                        setPostImageDeleted(true)
                                        $(".images-container").children().css('display', 'none')
                                        $(".uploadArrow").css("display", "initial")
                                    }} />}
                        </div>
                        <div onClick={loadedImage === '' ? loadPreviewImage : undefined} className="preview-image d-flex justify-content-center align-items-center" htmlFor="input-files" >
                            <FiUpload size={40} className="uploadArrow" />
                            <div className="images-container d-flex"></div>
                        </div>
                        <button className={darkMode ? 'btnPublNext w-100 textDark backLightDark' : 'btnPublNext w-100'} onClick={loadedImage !== '' ? HandlePost : undefined}>Publicar</button>
                    </div>
                </div>
            </div>
        </>
    )
}