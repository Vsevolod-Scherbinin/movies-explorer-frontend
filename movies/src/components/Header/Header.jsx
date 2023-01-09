import React from "react";
import { Route, Switch, Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';


function Header({loggedIn}) {
  return (
    <header className={`header ${!loggedIn && "header_route_main"}`}>
      <Link to="/" className="header__logo" />
      <Switch>
        <Route exact path="/">
          <Navigation loggedIn={loggedIn} />
        </Route>
        <Route path="/movies">
          <Navigation loggedIn={loggedIn} />
        </Route>
        <Route path="/saved-movies">
          <Navigation loggedIn={loggedIn} />
        </Route>
        <Route path="/profile">
          <Navigation loggedIn={loggedIn} />
        </Route>
      </Switch>
    </header>
  )
}

export default Header;
