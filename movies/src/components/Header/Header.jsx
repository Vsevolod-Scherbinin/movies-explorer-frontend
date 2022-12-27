import React from "react";
import { Route, Switch, Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';


function Header({main}) {
  return (
    <header className={`header ${main && "header_route_main"}`}>
      <Link to="/" className="header__logo" />
      <Switch>
        <Route exact path="/">
          <Navigation main={main} />
        </Route>
        <Route path="/movies">
          <Navigation main={main} />
        </Route>
        <Route path="/saved-movies">
          <Navigation main={main} />
        </Route>
        <Route path="/profile">
          <Navigation main={main} />
        </Route>
      </Switch>
    </header>
  )
}

export default Header;
