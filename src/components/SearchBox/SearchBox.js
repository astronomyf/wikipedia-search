import React from 'react';

import Button from './../Button/Button';

import './SearchBox.css';

const SearchBox = ({ placeholder, search, onChange, disabled, onClick }) => {
    return <div className="search-box">
            <input 
                value={search}
                type="text" 
                placeholder={placeholder} 
                className="search-box--input"
                onChange={(e) => {
                    const { value } = e.target;
                    onChange(value);
                }}
            />
            <div className="btn-position">
                <Button 
                    id="btn-search" 
                    label="Search" 
                    disabled={disabled}
                    onClick={onClick}
                />
            </div>
           </div>
}

export default SearchBox;