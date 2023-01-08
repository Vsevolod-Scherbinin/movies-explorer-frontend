import React from "react";
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies ({
  shownMovies,
  searchMovies,
  preloader,
  preloaderMessage,
  spinPreloader,
  savedMovies,
  savedMoviesId,
  handleDeleteMovie}){

  return(
    <main className="savedMovies">
      <SearchForm
        searchMovies={searchMovies} />
      <Preloader
        preloader={preloader}
        preloaderMessage={preloaderMessage}
        spinPreloader={spinPreloader} />
      <MoviesCardList
        shownMovies={shownMovies}
        savedMovies={savedMovies}
        savedMoviesId={savedMoviesId}
        handleDeleteMovie={handleDeleteMovie} />
    </main>
  )
}

export default SavedMovies;
