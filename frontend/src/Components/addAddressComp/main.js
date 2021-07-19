import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { TextField } from '@material-ui/core';

import { FiMapPin } from 'react-icons/fi'

import $ from 'jquery';

import api from '../../api.js'
import Cookie from 'js-cookie';

import Swal from 'sweetalert2'

export default function Main() {

    var history = useHistory();

    const [darkMode, setDarkMode] = useState();

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("dark")))
    }, []);


    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        setStreet('');
        setBlock('');
        setCity('')
        setUf('');
    }

    $(document).ready(function () {

        $(".profileContainer").width(window.innerWidth)

        $("#cep").blur(function (e) {

            //Nova variável "cep" somente com dígitos.
            var cep = $(this).val().replace(/\D/g, '');

            //Verifica se campo cep possui valor informado.
            if (cep !== "") {

                //Expressão regular para validar o CEP.
                var validacep = /^[0-9]{8}$/;

                //Valida o formato do CEP.
                if (validacep.test(cep)) {

                    //Preenche os campos com "..." enquanto consulta webservice.
                    $("#street").val("...");
                    $("#block").val("...");
                    $("#city").val("...");
                    $("#uf").val("...");

                    var counter = 0;
                    var timer = setInterval(function () {
                        if (counter >= 3) {
                            clearInterval(timer);
                        }

                        if ((counter === 3) && $("#street").val() === "...") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Houve um problema! <br> Servidores de buscas por CEP estão fora do ar!',
                                text: 'Por favor insira as informações de endereço manualmente.',
                            })
                        }
                    }, 1000);

                    //Consulta o webservice viacep.com.br/
                    $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                        if (!("erro" in dados)) {
                            //Atualiza os campos com os valores da consulta.
                            const StreetValue = $("#street").val(dados.logradouro);
                            setStreet(StreetValue.val());

                            const BlockValue = $("#block").val(dados.bairro);
                            setBlock(BlockValue.val());

                            const CityValue = $("#city").val(dados.localidade);
                            setCity(CityValue.val());

                            const UfValue = $("#uf").val(dados.uf);
                            setUf(UfValue.val());
                        } //end if.
                        else {
                            //CEP pesquisado não foi encontrado.
                            limpa_formulário_cep();
                            Swal.fire({
                                icon: 'error',
                                title: 'Erro!',
                                text: 'CEP não encontrado.',
                            })
                        }
                    });
                } //end if.
                else {
                    //cep é inválido.
                    limpa_formulário_cep();
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Formato de CEP inválido.',
                    })
                }
            } //end if.
            else {
                //cep sem valor, limpa formulário.
                limpa_formulário_cep();
            }
        });

        $('#cep').mask('00000-000')
        $("#uf").on("input", function () {
            var regexp = /[^a-zA-Z- ]/g;
            if (this.value.match(regexp)) {
                $(this).val(this.value.replace(regexp, ''));
            }
        });
    })

    const [zipCode, setZipCode] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [block, setBlock] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const _id = Cookie.get('ID', 'value');
    const idType = Cookie.get('Type', 'value');


    async function addUserAddress(e) {
        e.preventDefault()

        const data = {
            id: _id,
            zipCode: zipCode,
            number: number,
            street: street,
            block: block,
            city: city,
            uf: uf
        }

        switch (idType) {
            case 'cpf':
                const rawUserData = await api.get('/user', {
                    headers: {
                        _id
                    }
                })

                if (rawUserData.data.address.length < 3) {
                    await api.put('addAddress', data)

                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Endereço cadastrado.',
                    }).then(() => {
                        history.push('/profile')
                        window.location.reload()
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Erro inesperado. Tente novamente',
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
                    await api.put('addAddressCompany', data)
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Endereço cadastrado.',
                    }).then(() => {
                        history.push('/profile')
                        window.location.reload()
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Erro inesperado. Tente novamente',
                    })
                }
                break;
            default:
                break;
        }
    }

    return (
        <div className={darkMode ? " backDark animationProfile centered" : " animationProfile centered"}>
            <div className={darkMode ? "profile-container w-75 backLightDark" : "profile-container w-75"}>
                <div className="p-3 input-profile-container" id="adressesContainer">
                    <div id="addAddress" className="newaddressContainer">
                        <h4 className="m-0 p-0 mb-3">Adicione um endereço</h4>
                        <form className="d-flex justify-content-between align-items-center flex-wrap w-100" onSubmit={addUserAddress}>
                            <TextField
                                required
                                id="cep"
                                name="CEP"
                                style={{ width: '48%' }}
                                placeholder="Digite aqui"
                                label={<div><FiMapPin className="mr-1" />CEP</div>}
                                value={zipCode}
                                onChange={e => setZipCode(e.target.value)}
                            />
                            <TextField
                                required
                                style={{ width: '48%' }}
                                name="Número"
                                id="number"
                                placeholder="Digite aqui"
                                label={<div>Nº</div>}
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                            />
                            <TextField
                                required
                                className="mt-2"
                                name="Rua"
                                id="street"
                                fullWidth
                                placeholder="Digite aqui"
                                label={<div>Rua</div>}
                                value={street}
                                onChange={e => setStreet(e.target.value)}
                            />
                            <TextField
                                required
                                className="mt-2"
                                name="Bairro"
                                id="block"
                                fullWidth
                                placeholder="Digite aqui"
                                label={<div>Bairro</div>}
                                value={block}
                                onChange={e => setBlock(e.target.value)}
                            />
                            <TextField
                                required
                                className="mt-2"
                                name="Cidade"
                                id="city"
                                fullWidth
                                placeholder="Digite aqui"
                                label={<div>Cidade</div>}
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                            <TextField
                                required
                                className="mt-2 mb-3"
                                name="Estado"
                                id="uf"
                                fullWidth
                                placeholder="Digite aqui"
                                label={<div>Estado</div>}
                                inputProps={{ maxLength: 2 }}
                                value={uf}
                                onChange={e => setUf(e.target.value)}
                            />
                            <button id="save-addAdress-btn" type='submit' className="d-flex justify-content-center align-items-center ">Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}