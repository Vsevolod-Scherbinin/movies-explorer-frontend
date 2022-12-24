import React from "react";
import { Route, Switch, Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';


function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      <Switch>
        <Route exact path="/">
          <Navigation main={true} />
        </Route>
        <Route path="/movies">
          <Navigation main={false} />
        </Route>
        <Route path="/saved-movies">
          <Navigation main={false} />
        </Route>
        <Route path="/profile">
          <Navigation main={false} />
        </Route>
      </Switch>
    </header>
  )
}

export default Header;
