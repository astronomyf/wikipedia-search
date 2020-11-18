import React from 'react';

import './Select.css';

const Select = ({ onChange }) => {

    return <div className="select-box">
            <label htmlFor="select" className="select--label">Choose a language: </label>
            <select 
                name="lang" 
                className="select--option" 
                onChange={(e) => {
                    const { value } = e.target;
                    onChange(value);
                }}>
                <option value="en">EN</option>
                <option value="it">IT</option>
                <option value="es">ES</option>
                <option value="de">DE</option>
            </select>
           </div>
}

export default Select;