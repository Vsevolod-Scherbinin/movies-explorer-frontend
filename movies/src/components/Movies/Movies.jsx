import React from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies({
  showMore,
  moviesRemains,
  shortMoviesRemains,
  shownMovies,
  shortMoviesStatus,
  searchMovies,
  preloader,
  preloaderMessage,
  spinPreloader,
  filterShortMovies,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
  savedMoviesId}) {

  return(
    <main className="movies">
      <SearchForm
        searchMovies={searchMovies}
        filterShortMovies={filterShortMovies} />
      <Preloader
        preloader={preloader}
        preloaderMessage={preloaderMessage}
        spinPreloader={spinPreloader} />
      <MoviesCardList
        showMore={showMore}
        moviesRemains={moviesRemains}
        shortMoviesRemains={shortMoviesRemains}
        shownMovies={shownMovies}
        shortMoviesStatus={shortMoviesStatus}
        isSavedList={false}
        preloader={preloader}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        savedMovies={savedMovies}
        savedMoviesId={savedMoviesId} />
    </main>
  )
}

export default Movies;
