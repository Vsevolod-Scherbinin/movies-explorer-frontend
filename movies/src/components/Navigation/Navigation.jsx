import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import MenuPopup from '../MenuPopup/MenuPopup';

function Navigation({main}) {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);

  function openMenu() {
    setIsMenuPopupOpen(true);
  }

  function closeMenu() {
    setIsMenuPopupOpen(false);
  }

  return (
    <div className={`navigation ${main ? "navigation__route_main" : "navigation__route_notMain"}`}>
      <nav className={`${main ? "navigation__bar navigation__bar_route_main"  : "navigation__hiddenElement"}`}>
        <NavLink to="/sign-up" className="navigation__link navigation__link_content_register">Регистрация</NavLink>
        <NavLink to="/sign-in" className="navigation__link">
          <button className="navigation__button navigation__button_type_signin">Войти</button>
        </NavLink>
      </nav>

      <div className={`${main ? "navigation__hiddenElement" : "navigation__bar navigation__bar_route_notMain"}`}>
        <nav className="navigation__links">
          <NavLink to="/movies" className="navigation__link navigation__link_content_films ">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="navigation__link navigation__link_content_savedFilms ">Сохранённые фильмы</NavLink>
        </nav>
        <NavLink to="/profile" className="navigation__linkButton ">
          <button className="navigation__button navigation__button_type_profile">Аккаунт</button>
        </NavLink>
      </div>
      <button className={`${main ? "navigation__hiddenElement" : "navigation__button navigation__button_type_menu navigation__hiddenElement"}`} onClick={openMenu}></button>
      <MenuPopup isOpen={isMenuPopupOpen} onClose={closeMenu} />
    </div>
  )
}

export default Navigation;
