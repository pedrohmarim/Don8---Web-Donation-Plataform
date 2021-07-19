import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const BannerInfo = ({ title, description, btnText }) => {

    const [darkMode, setDarkMode] = useState();

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("dark")))
    }, []);

    return (
        <>
            <h3 className={darkMode ? 'textLightDark' : 'textDark'}>{title}</h3>
            <p className={darkMode ? 'textLightDark' : 'textDark'}>{description}</p>
            <Link to="/login">
                <button className="btn-login">
                    {btnText}<FaArrowRight />
                </button>
            </Link>
        </>
    )
}

export const BannerInfo2 = ({ title, description, btnText }) => {

    const [darkMode, setDarkMode] = useState();

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("dark")))
    }, []);

    return (
        <>
            <h3 className={darkMode ? 'textLightDark' : 'textDark'}>{title}</h3>
            <p className={darkMode ? 'textLightDark' : 'textDark'}>{description}</p>
            <Link to="/login">
                <button className="btn-login">
                    {btnText}<FaArrowRight />
                </button>
            </Link>
        </>
    )
}
export const BannerInfo3 = ({ title, description, btnText }) => {

    const [darkMode, setDarkMode] = useState();

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("dark")))
    }, []);

    return (
        <>
            <h3 className={darkMode ? 'textLightDark' : 'textDark'}>{title}</h3>
            <p className={darkMode ? 'textLightDark' : 'textDark'}>{description}</p>
            <Link to="/login">
                <button className="btn-login">
                    {btnText}<FaArrowRight />
                </button>
            </Link>
        </>
    )
}
export const BannerInfo4 = ({ title, description, btnText }) => {

    const [darkMode, setDarkMode] = useState();

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("dark")))
    }, []);

    return (
        <>
            <h3 className={darkMode ? 'textLightDark' : 'textDark'}>{title}</h3>
            <p className={darkMode ? 'textLightDark' : 'textDark'}>{description}</p>
            <Link to="/login">
                <button className="btn-login">
                    {btnText}<FaArrowRight />
                </button>
            </Link>
        </>
    )
}