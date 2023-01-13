import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm({searchMovies, filterShortMovies}) {

  const currentRoute = useLocation();

  const [inputSearchValue, setInputSearchValue] = useState('');
  const [shortMovieSwitch, setShortMovieSwitch] = useState(false);

  function handleSearchInputChange(evt) {
    setInputSearchValue(evt.target.value);
  }

  function handleShortMovieSwitch() {
    const newSwitch = !shortMovieSwitch;
    setShortMovieSwitch(newSwitch);
    filterShortMovies(newSwitch);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    searchMovies(inputSearchValue);
  }

  useEffect(() => {
    if(currentRoute.pathname === '/movies') {
      setInputSearchValue(localStorage.getItem('inputSearchValue'));
      setShortMovieSwitch(localStorage.getItem('shortMoviesStatus') === 'true');
    }
  }, []);

  return(
    <section className="searchForm">
      <div className="searchForm__main">
        <form className="searchForm__inputGroup" onSubmit={handleSubmit} noValidate>
          <div className="searchForm__icon"></div>
          <input type="text" name="searchMovie" id="search-input" className="searchForm__input"
          value={inputSearchValue || ''}
          onChange={handleSearchInputChange}
          placeholder="Фильм" minLength="1" required/>
          <button type="submit" className="searchForm__searchButton"></button>
        </form>
        <div className="searchForm__switchGroup">
          <label className="searchForm__switch">
            <input name="shortFilm" type="checkbox" className="searchForm__checkbox"
            value={shortMovieSwitch} checked={shortMovieSwitch} onChange={handleShortMovieSwitch} />
            <span className="searchForm__switchDecorator"></span>
          </label>
          <p className="searchForm__shortFilms">Короткометражки</p>
        </div>
      </div>
    </section>
  )
}

export default SearchForm;
