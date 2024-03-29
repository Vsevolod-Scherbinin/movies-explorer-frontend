import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import MenuPopup from '../MenuPopup/MenuPopup';

function Navigation({loggedIn}) {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);

  function openMenu() {
    setIsMenuPopupOpen(true);
  }

  function closeMenu() {
    setIsMenuPopupOpen(false);
  }

  return (
    <div className={`navigation ${!loggedIn ? "navigation__route_main" : "navigation__route_notMain"}`}>
      <nav className={`${!loggedIn ? "navigation__bar navigation__bar_route_main"  : "navigation__hiddenElement"}`}>
        <NavLink to="/signup" className="navigation__link navigation__link_content_register">Регистрация</NavLink>
        <NavLink to="/signin" className="navigation__link">
          <button className="navigation__button navigation__button_type_signin">Войти</button>
        </NavLink>
      </nav>

      <div className={`${!loggedIn ? "navigation__hiddenElement" : "navigation__bar navigation__bar_route_notMain"}`}>
        <nav className="navigation__links">
          <NavLink to="/movies" className="navigation__link navigation__link_content_films ">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="navigation__link navigation__link_content_savedFilms ">Сохранённые фильмы</NavLink>
        </nav>
        <NavLink to="/profile" className="navigation__linkButton ">
          <button className="navigation__button navigation__button_type_profile">Аккаунт</button>
        </NavLink>
      </div>
      <button className={`${!loggedIn ? "navigation__hiddenElement" : "navigation__button navigation__button_type_menu navigation__hiddenElement"}`} onClick={openMenu}></button>
      <MenuPopup isOpen={isMenuPopupOpen} onClose={closeMenu} />
    </div>
  )
}

export default Navigation;
