import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header main={true} />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header main={false} />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header main={false} />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header main={false} />
          <Profile />
        </Route>
        <Route path="/sign-up">
          <Register />
        </Route>
        <Route path="/sign-in">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
