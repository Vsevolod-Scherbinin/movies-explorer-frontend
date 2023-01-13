import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList ({
  showMore,
  moviesRemains,
  shortMoviesRemains,
  shownMovies,
  shortMoviesStatus,
  preloader,
  handleSaveMovie,
  handleDeleteMovie,
  savedMoviesId}){

  const currentRoute = useLocation();

  return(
    <section className={`moviesCardList ${preloader && "moviesCardList_hidden"}`}>
      <ul className="moviesCardList__cards">
        {
          shownMovies.map((movieItem) => (
            <MoviesCard
              key={movieItem.id || movieItem.movieId}
              movie={movieItem}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              savedMoviesId={savedMoviesId} />))
        }
      </ul>
      {currentRoute.pathname === '/movies' && (
        <button className={`
          ${(moviesRemains.length > 0 && !shortMoviesStatus) ? "moviesCardList__moreButton" : "moviesCardList__moreButton_hidden"}
          ${(shortMoviesRemains > 0 && shortMoviesStatus) && "moviesCardList__moreButton"}`}
          onClick={showMore}>Ещё</button>
      )}
    </section>
  )
}

export default MoviesCardList;
