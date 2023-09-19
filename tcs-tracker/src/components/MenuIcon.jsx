import React from 'react';
import './MenuIcon.css'

const MenuIcon = ({ onClick }) => {
    return (
        <img src='/menuIcon.svg' alt="Menu" className="menuIcon svgTheme" onClick={onClick}></img>
    );
};

export default MenuIcon; 