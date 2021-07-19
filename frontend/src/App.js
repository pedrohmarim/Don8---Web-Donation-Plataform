import React, { useState, useEffect } from 'react';
import './Styles/GlobalStyles.css';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'

const App = () => {

  const [darkMode, setDarkMode] = useState();

  useEffect(() => {
    setDarkMode(JSON.parse(localStorage.getItem("dark")))
  }, []);

  darkMode ?
    $('body,html').addClass('changeBody') :
    $('body,html').removeClass('changeBody')

  return (
    <Routes />
  )

}

export default App;
