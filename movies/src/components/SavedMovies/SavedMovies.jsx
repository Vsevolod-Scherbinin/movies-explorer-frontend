import React from "react";
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies (){

  return(
    <main className="savedMovies">
      <SearchForm />
      <MoviesCardList isSavedList={true} />
    </main>
  )
}

export default SavedMovies;
