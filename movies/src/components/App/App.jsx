import { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Popup from '../Popup/Popup';

import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as Auth from '../../utils/Auth';


function App() {
  // ------------------------- StateVars-Movies-Start -------------------------
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [extraMovies, setExtraMovies] = useState([]);
  const [shownMovies, setShownMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [extraShortMovies, setExtraShortMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedShownMovies, setSavedShownMovies] = useState([]);
  const [savedMoviesId, setSavedMoviesId] = useState([]);
  // ------------------------- StateVars-Movies-End -------------------------

  // ------------------------- StateVars-Movies-Service-Start -------------------------
  const [shortMoviesStatus, setShortMoviesStatus] = useState(false);
  const [moviesCounter, setMoviesCount] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [preloader, setPreloader] = useState(true);
  const [spinPreloader, setSpinPreloader] = useState(false);
  const [preloaderMessage, setPreloaderMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupErrorCode, setPopupErrorCode] = useState('');
  const [popupErrorMessage, setPopupErrorMessage] = useState('');
  const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth);
  // ------------------------- StateVars-Movies-Service-End -------------------------

  // ------------------------- StateVars-User-Start -------------------------
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  // ------------------------- StateVars-User-End -------------------------

  const history = useHistory();
  const currentRoute  = useLocation();

  // ------------------------- Movies-Start -------------------------
  useEffect(() => {
    setMoviesCount(countMovies());
    const handleResize = () => {
      setScreenWidth(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  function searchMovies(inputSearchValue) {

    if (!inputSearchValue) {
      setPreloaderMessage('Нужно ввести ключевое слово');
      return;
    }

    localStorage.setItem('inputSearchValue', inputSearchValue);
    localStorage.setItem('shortMoviesStatus', shortMoviesStatus);
    setPreloaderMessage('');

    if(currentRoute.pathname === '/movies') {
      moviesApi.getMovies()
        .then(setSpinPreloader(true))
        .then((res) => {
          setPreloader(false);
          setSpinPreloader(false)

          const foundMovies = res.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearchValue.toLowerCase()));
          localStorage.setItem('foundMovies', JSON.stringify(foundMovies));

          if(foundMovies.length === 0) {
            setPreloader(true);
            setPreloaderMessage('Ничего не найдено');
          }

          const shortFoundMovies = foundMovies.filter(movie => movie.duration <= 40);

          const splicedMovies = foundMovies.splice(0, moviesCounter[0]);
          setMoviesToShow(splicedMovies);
          localStorage.setItem('moviesToShow', JSON.stringify(splicedMovies));

          setExtraMovies(foundMovies);
          localStorage.setItem('extraMovies', JSON.stringify(foundMovies));

          const splicedShortMovies = shortFoundMovies.splice(0, moviesCounter[0]);
          setShortMovies(splicedShortMovies);
          localStorage.setItem('shortMovies', JSON.stringify(splicedShortMovies));

          setExtraShortMovies(shortFoundMovies);
          localStorage.setItem('extraShortMovies', JSON.stringify(shortFoundMovies));

          if(!shortMoviesStatus) {
            setShownMovies(splicedMovies);
            localStorage.setItem('shownMovies', JSON.stringify(splicedMovies));
          } else {
            setShownMovies(splicedShortMovies);
            localStorage.setItem('shownMovies', JSON.stringify(splicedShortMovies));
          }
        })
        .catch((err) => {
          console.log(err);
          setPreloaderMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');

          setMoviesToShow([]);
          setExtraMovies([]);
          setShownMovies([]);
          setShortMovies([]);
          setShortMovies([]);
          setExtraShortMovies([]);

          localStorage.clear();
      });
    } else {  // on saved-movies
      setPreloader(false);
      const savedFoundMovies = savedMovies.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearchValue.toLowerCase()));
      localStorage.setItem('savedFoundMovies', JSON.stringify(savedFoundMovies));

      if(savedFoundMovies.length === 0) {
        setPreloader(true);
        setPreloaderMessage('Ничего не найдено');
      }

      const savedShortFoundMovies = savedFoundMovies.filter(movie => movie.duration <= 40);

      if(!shortMoviesStatus) {
        setSavedShownMovies(savedFoundMovies);
        localStorage.setItem('shownMovies', JSON.stringify(savedFoundMovies));
      } else {
        setSavedShownMovies(savedShortFoundMovies);
        localStorage.setItem('shownMovies', JSON.stringify(savedShortFoundMovies));
      }
    }
  }

  function filterShortMovies(shortMoviesSwitch) {
    setShortMoviesStatus(shortMoviesSwitch);

    if (shortMoviesSwitch) {
      setShownMovies(shortMovies);
      localStorage.setItem('shortMoviesStatus', true);
    } else {
      setShownMovies(moviesToShow);
      localStorage.setItem('shortMoviesStatus', false);
    }
  }

  function countMovies() {
    let countCards;
    const moviesCounterConfig = {
      '1280': [12, 3],
      '768': [8, 2],
      '320': [5, 2],
    };

    Object.keys(moviesCounterConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (screenWidth >= key) {
          countCards = moviesCounterConfig[key];
        }
      });

    return countCards;
  }

  function showMore() {
    if(!shortMoviesStatus) {
      const splicedMovies = extraMovies;
      const newShownMovies = shownMovies.concat(splicedMovies.splice(0, moviesCounter[1]));
      setShownMovies(newShownMovies);
      localStorage.setItem('shownMovies', JSON.stringify(newShownMovies));
      setMoviesToShow(newShownMovies);
      localStorage.setItem('moviesToShow', JSON.stringify(newShownMovies));
      setExtraMovies(splicedMovies);
      localStorage.setItem('extraMovies', JSON.stringify(splicedMovies));
    } else {
      const splicedShortMovies = extraShortMovies;
      const newShownShortMovies = shortMovies.concat(splicedShortMovies.splice(0, moviesCounter[1]));
      setShownMovies(newShownShortMovies);
      localStorage.setItem('shownMovies', JSON.stringify(newShownShortMovies));
      setExtraShortMovies(splicedShortMovies);
      localStorage.setItem('extraShortMovies', JSON.stringify(splicedShortMovies));
    }
  }

  function handleSaveMovie(movie) {
    if(!savedMoviesId.includes(movie.movieId || movie.id)){
      const movieData = {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      };

      mainApi.saveMovie(movieData)
        .then((res) => {
          setSavedMovies([res, ...savedMovies]);
          setSavedShownMovies([res, ...savedMovies]);
          setSavedMoviesId([res.movieId, ...savedMoviesId]);
        })
        .catch((err) => {
          setIsPopupOpen(true);
          setPopupErrorCode(err.message.status);
          setPopupErrorMessage(err.error);
          console.log(err);
      });
    }
  }

  function handleDeleteMovie(movie) {

    const currentId = movie.id || movie.movieId;
    mainApi.deleteMovie(currentId)
    .then(() => {
      setSavedMovies((prevState) => prevState.filter((item) => item.movieId !== currentId));
      setSavedShownMovies((prevState) => prevState.filter((item) => item.movieId !== currentId));
      setSavedMoviesId((prevState) => prevState.filter((item) => item !== currentId));
    })
    .catch((err) => {
      setIsPopupOpen(true);
      setPopupErrorCode(err.message.status);
      setPopupErrorMessage(err.error);
      console.log(err);
    });
  }

  useEffect(() => {
    mainApi.getMovies()
      .then((res) => {
        setSavedMovies(res);
        setSavedShownMovies(res);
        setSavedMoviesId(res.map(elem => elem.movieId));
      })
      .catch((err) => {
        console.log(err);
      });

    const localFoundMovies = JSON.parse(localStorage.getItem('foundMovies'));
    const localMoviesToShow = JSON.parse(localStorage.getItem('moviesToShow'));
    const localExtraMovies = JSON.parse(localStorage.getItem('extraMovies'));
    const localShownMovies = JSON.parse(localStorage.getItem('shownMovies'));
    const localShortMovies = JSON.parse(localStorage.getItem('shortMovies'));
    const localExtraShortMovies = JSON.parse(localStorage.getItem('extraShortMovies'));

    const localStorageInputSearchValue = localStorage.getItem('inputSearchValue');
    const localStorageShortMoviesStatus = localStorage.getItem('shortMoviesStatus');

    if(localFoundMovies === null) {
      setPreloader(true);
      setPreloaderMessage('Ничего не найдено');
      return;
    }
    else {
      setPreloader(false);
      setMoviesToShow(localMoviesToShow);
      setExtraMovies(localExtraMovies);
      setShownMovies(localShownMovies);
      setShortMovies(localShortMovies);
      setExtraShortMovies(localExtraShortMovies);
    }

    if (localStorageShortMoviesStatus === 'true') {
      setShortMoviesStatus(localStorageShortMoviesStatus === 'true');
      setShownMovies(localShortMovies);
      localStorage.setItem('shortMoviesStatus', true);
    } else {
      setShownMovies(localShownMovies);
      localStorage.setItem('shortMoviesStatus', false);
    }


    if (localStorageInputSearchValue) {
      setSearchInputValue(localStorageInputSearchValue);
    }
  }, []);
  // ------------------------- Movies-End -------------------------

  // ------------------------- User-Start -------------------------
  useEffect(() => {
    if(!loggedIn) return;
    mainApi.getUserInfo()
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        setIsPopupOpen(true);
        setPopupErrorCode(err.message.status);
        setPopupErrorMessage(err.error);
        console.log(err);
      });
  }, [loggedIn]);

  function handleUpdateUser(user) {
    mainApi.editProfile(user.name, user.email)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        setIsPopupOpen(true);
        setPopupErrorCode(err.message.status);
        setPopupErrorMessage(err.error);
        console.log(err);
      });
  }
  // ------------------------- User-End -------------------------


  // ------------------------- Authorization-Start -------------------------
  function handleRegister(email, password, name) {
    return Auth.register(email, password, name)
      .then((res) => {
        if(res) {
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLogin(email, password) {
    return Auth.authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLogout() {
    Auth.signout()
      .then(() => {
        setLoggedIn(false);
        localStorage.clear();
        history.push('/signin');
      })
      .catch((err) => {
        setIsPopupOpen(true);
        setPopupErrorCode(err.message.status);
        setPopupErrorMessage(err.error);
        console.log(err);
      });
  }

  useEffect(() => {
    function checkToken() {
      return Auth.getContent()
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            history.push('/movies');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    checkToken();
  }, [])
  // -------------------------Authorization-End-------------------------

  function closePopup() {
    setIsPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header loggedIn={loggedIn} />
            <Main />
            <Footer />
          </Route>
          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} />
            <Movies
              showMore={showMore}
              moviesRemains={extraMovies}
              shortMoviesRemains = {extraShortMovies}
              shownMovies={shownMovies}
              shortMoviesStatus={shortMoviesStatus}
              searchMovies={searchMovies}
              searchInputValue={searchInputValue}
              preloader={preloader}
              preloaderMessage={preloaderMessage}
              spinPreloader={spinPreloader}
              filterShortMovies={filterShortMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
              savedMoviesId={savedMoviesId} />
            <Footer />
            {/* <Popup
        isPopupOpen={isPopupOpen}
        popupErrorCode={popupErrorCode}
        popupErrorMessage={popupErrorMessage} /> */}
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} />
            <SavedMovies
              moviesRemains={[]}
              shownMovies={savedShownMovies}
              searchMovies={searchMovies}
              searchInputValue={searchInputValue}
              preloader={preloader}
              preloaderMessage={preloaderMessage}
              spinPreloader={spinPreloader}
              filterShortMovies={filterShortMovies}
              savedMovies={savedMovies}
              savedMoviesId={savedMoviesId}
              handleDeleteMovie={handleDeleteMovie} />
            <Footer />
            {/* <Popup
        isPopupOpen={isPopupOpen}
        popupErrorCode={popupErrorCode}
        popupErrorMessage={popupErrorMessage} /> */}
          </ProtectedRoute>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} />
            <Profile onUpdateUser={handleUpdateUser} onLogout={handleLogout} />
          </ProtectedRoute>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="*">
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Popup
        isPopupOpen={isPopupOpen}
        popupErrorCode={popupErrorCode}
        popupErrorMessage={popupErrorMessage}
        closePopup={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
