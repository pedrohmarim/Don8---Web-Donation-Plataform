import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import $ from 'jquery';

const BtnPost = ({ loggedUserName }) => {

    const [darkMode, setDarkMode] = useState();

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("dark")))
    }, []);


    function toggleModal() {
        $("#animationPosts").toggleClass('static')
        $('html, body').animate({ scrollTop: 0 });
        $("#FirstmodalContainer").toggleClass('toggleModal')
        $("body").toggleClass('hiddenScroll')
    }

    return (
        <div className={darkMode ? "postPublContainer d-flex align-items-center justify-content-center backLightDark" : "postPublContainer d-flex align-items-center justify-content-center"} onClick={toggleModal}>
            <FaUserCircle size={25} className="mr-1" color="#33345c" />
            <button id="btnPubl">Faça uma publicação, {loggedUserName}</button>
        </div>
    )
}

export default BtnPost;