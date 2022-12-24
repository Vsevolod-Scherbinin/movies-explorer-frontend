import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList ({isSavedList}){

  return(
    <section className="moviesCardList">
      <ul className="moviesCardList__cards">
        <MoviesCard isSavedList={isSavedList} isSaved={true} />
        <MoviesCard isSavedList={isSavedList}/>
        <MoviesCard isSavedList={isSavedList} isSaved={true}/>
        <MoviesCard isSavedList={isSavedList}/>
        <MoviesCard isSavedList={isSavedList} isSaved={true}/>
        <MoviesCard isSavedList={isSavedList}/>
        <MoviesCard isSavedList={isSavedList}/>
        <MoviesCard isSavedList={isSavedList}/>
      </ul>
      <div className="moviesCardList__more">
        <button className="moviesCardList__moreButton">Ещё</button>
      </div>
    </section>
  )
}

export default MoviesCardList;
