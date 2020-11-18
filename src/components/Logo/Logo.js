import React from 'react';

import './Logo.css';

import WikiLogo from './../../assets/images/wikipedia-logo.png';

const Logo = () => {
    return <div className="logo-box">
            <img alt="Wikipedia logo" src={WikiLogo} width="38" />
            <span className="logo--title">WikiSearch</span>
           </div>
}

export default Logo;