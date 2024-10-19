import React, { useContext, useState } from "react"
import {NavLink} from "react-router-dom"
import './header.css'
import { ThemeContext } from '../units/ThemeContext';

const Header = () => {
    const { mode, modeToggle } = useContext(ThemeContext);
    return (
        <nav className="nav-container">
      <div className="nav-items">
        <NavLink className="nav-item" to="/">Home</NavLink>
        <NavLink className="nav-item" to="/about">About</NavLink>
        <NavLink className="nav-item" to="/contact">Contact</NavLink>
      </div>
      <button className="mode-toggle" onClick={modeToggle}>Mode: {mode}</button>
    </nav>


)
}

export default Header;