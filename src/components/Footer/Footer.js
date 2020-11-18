import React from 'react';

import './Footer.css';
import heartIcon from './../../assets/images/Heart_font_awesome.svg';

const Footer = () => {
    return <footer className="footer">
            <div>
                Made with&nbsp;
                <img width="18" alt="Heart icon" src={heartIcon} />
            </div>
            <div>&copy;2020 Francesco Violante</div>
           </footer>;
}

export default Footer;