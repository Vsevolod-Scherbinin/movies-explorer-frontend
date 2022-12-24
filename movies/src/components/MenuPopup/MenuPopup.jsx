import React from "react";
import { NavLink, Link } from 'react-router-dom';
import './MenuPopup.css';

function MenuPopup({isOpen, onClose}) {
  return (
    <div className={`menuPopup ${isOpen && "menuPopup_open"}`}>
      <div className="menuPopup__cover"></div>
      <button className="menuPopup__closeButton" onClick={onClose}></button>
      <div className="menuPopup__nav">
        <nav className="menuPopup__links">
          <NavLink exact to="/" className="menuPopup__link" activeClassName="menuPopup__link_active">Главная</NavLink>
          <NavLink to="/movies" className="menuPopup__link" activeClassName="menuPopup__link_active">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="menuPopup__link" activeClassName="menuPopup__link_active">Сохранённые фильмы</NavLink>
        </nav>
        <Link to="/profile" className="menuPopup__link">
          <button className="menuPopup__profileButton">Аккаунт</button>
        </Link>
      </div>
    </div>
  )
}

export default MenuPopup;
