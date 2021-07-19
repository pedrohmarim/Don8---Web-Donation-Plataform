import React from 'react';
import DarkModeToggle from "react-dark-mode-toggle";

import $ from 'jquery'

export default function Main() {

    const [darkMode, setDarkMode] = React.useState(getInitialMode());

    React.useEffect(() => {
        localStorage.setItem("dark", JSON.stringify(darkMode));

    }, [darkMode]);

    function getInitialMode() {
        const isReturningUser = "dark" in localStorage;
        const savedMode = JSON.parse(localStorage.getItem("dark"));
        const userPrefersDark = getPrefColorScheme();
        if (isReturningUser) {
            return savedMode;
        } else if (userPrefersDark) {
            return true;
        } else {
            return false;
        }
    }

    function getPrefColorScheme() {
        if (!window.matchMedia) return;

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    $(document).ready(function () {
        $(".settingsContainer").width(window.innerWidth)
    })

    return (
        <div className={darkMode ? "settingsContainer backDark " : "settingsContainer"}>
            <h1 className={darkMode ? 'textLightDark text-center mb-3' : 'text-center mb-3'}>Configurações</h1>

            <div className={darkMode ? "profile-container w-75 mb-4 backLightDark m-auto" : "profile-container w-75 mb-4 m-auto"}>
                <h3 className={darkMode ? "mt-2 mb-1 ml-3 pt-2 textDark" : "mt-2 mb-1 ml-3 pt-2"}>Acessibilidade</h3>
                <div className="d-flex justify-content-center align-items-center flex-wrap p-3 input-profile-container">

                    <section id="dark-mode-container" className="w-100 pl-2 pr-3">
                        <h4
                            className={darkMode ? "dark-mode-text textDark" : "light-mode textDark"}
                            id="text-dark"
                        >
                            {darkMode ? "Modo escuro" : "Modo claro"}
                        </h4>

                        <DarkModeToggle
                            checked={darkMode}
                            onChange={() => {
                                setDarkMode(prevMode => !prevMode)
                                window.location.reload()
                            }}
                            size={60}
                        />
                    </section>
                </div>
            </div>
        </div>
    )
}