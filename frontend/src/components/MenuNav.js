import React from 'react'

import '../styles/MenuNav.css'

const MenuNav = () => {
    return (
        <nav className="header">
            <div className="nav-wrapper">
                <a className="logo" href='/'>SSU</a>
                <input className="menu-btn" type="checkbox" id="menu-btn"/>
                <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>

                <ul className="menu">
                    <li><a href="/Planner">Planner</a></li>
                    <li><a href="/Resources">Resources</a></li>
                    <li><a href="/About">About Us</a></li>                
                </ul>
            </div>

        </nav>
    )
}

export default MenuNav;