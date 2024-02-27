import logoImg from '../images/logo.png';
import '../css/header.css'
import React, { useState } from 'react';




function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div >
            <div className="header-online">
                <div className="logo">
                    <a href='/'><img src={logoImg} alt="logo" /></a>
                </div>

                <ul>
                    <li><a href="/">Home </a></li>
                    <li><a href="/About">About </a></li>
                    <li><a href="/favourites">Favourites</a></li>
                    <li><a href="/watch">Watch List</a></li>
                </ul>
            </div>
            <div className='ham-with-img'>
                
                <div className="hamburger-menu">
                
                    <button className={`menu-button ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <div className="menu-bar"></div>
                        <div className="menu-bar"></div>
                        <div className="menu-bar"></div>
                    </button>
                    <ul className={`menu-items ${isOpen ? 'open' : ''}`}>
                        <li><a href="/">Home </a></li>
                        <li><a href="/About">About </a></li>
                        <li><a href="/favourites">Favourites</a></li>
                        <li><a href="/watch">Watch List</a></li>
                        {/* Add more menu items as needed */}
                    </ul>
                </div>
                <div className="logo">
                    <a href='/'><img src={logoImg} alt="logo" /></a>
                </div>
            </div>
        </div>
    );

}

export default Header;