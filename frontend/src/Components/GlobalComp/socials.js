import React from 'react';

import $ from 'jquery';

import { FiFacebook, FiInstagram, FiTwitter, FiGithub, FiChevronUp } from 'react-icons/fi'

const Socials = () => {

    window.onload = function () {
        $('.socialsContainer').hover(function () {
            $('.social').toggleClass('hiddenSocial')
            $('.arrow').toggleClass('rotate')
        })
    }

    return (
        <div className="socialsContainer">
            <div className="social hiddenSocial" style={{ background: '#1877f2' }}>
                <FiFacebook size={22} />
            </div>
            <div className="social hiddenSocial" style={{ background: '#db236c' }}>
                <FiInstagram size={22} />
            </div>
            <div className="social hiddenSocial" style={{ background: '#1da1f2' }}>
                <FiTwitter size={22} />
            </div>
            <div className="social hiddenSocial" style={{ background: '#000' }}>
                <FiGithub size={22} />
            </div>
            <div >
                <FiChevronUp size={22} />
            </div>
        </div >
    )
}

export default Socials;