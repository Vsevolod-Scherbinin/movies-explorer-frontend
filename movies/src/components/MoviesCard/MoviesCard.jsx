import { useEffect, useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';


function MoviesCard ({
  movie,
  handleSaveMovie,
  handleDeleteMovie,
  savedMoviesId}){

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const currentRoute  = useLocation();

  const [movieImageUrl, setMovieImageUrl] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {

    setIsSaved(savedMoviesId.includes(movie.movieId || movie.id));

    if(currentRoute.pathname === '/movies') {
      setMovieImageUrl(`url(https://api.nomoreparties.co${movie.image.url})`);
    } else {
      setMovieImageUrl(`url(${movie.image})`);
    }
  }, [savedMoviesId]);

  function handleSave() {
    handleSaveMovie(movie);
  }

  function handleDelete() {
    handleDeleteMovie(movie);
  }

  return(
    <li className="moviesCard">
      <div className="moviesCard__image" alt={movie.nameRU} style={{ backgroundImage: `${movieImageUrl}` }}>
        <button className={`moviesCard__icon ${isSaved ? "moviesCard__hiddenElement" : "moviesCard__saveButton"}`} onClick={handleSave} >Сохранить</button>
        <button className={`moviesCard__icon ${(currentRoute.pathname === '/saved-movies') ? "moviesCard__deleteButton" : "moviesCard__hiddenElement"}`} onClick={handleDelete} ></button>
        <a className="moviesCard__trailerLinkOverlay" href={movie.trailerLink} target="_blank" rel="noreferrer"></a>
      </div>
      <div className="moviesCard__bottom">
        <h2 className="moviesCard__name">{movie.nameRU}</h2>
        <div className="moviesCard__duration">
          <p className="moviesCard__durationValue">{`${hours}ч ${minutes}м`}</p>
        </div>
      </div>
      <div className={`moviesCard__icon ${isSaved && "moviesCard__savedIcon"} ${(currentRoute.pathname === '/saved-movies') && "moviesCard__hiddenElement"}`} onClick={handleDelete}></div>
    </li>
  )
}

export default MoviesCard;
