import React from 'react';
import Form from '../../Components/LoginComp'

export default function Login() {

    document.getElementsByTagName("title")[0].innerText = 'Don8 | Entrar';

    return (
        <Form />
    );

}