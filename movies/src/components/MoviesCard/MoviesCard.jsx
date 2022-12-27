import React from "react";
import './MoviesCard.css';

function MoviesCard ({isSavedList, isSaved}){

  return(
    <li className={`${!isSavedList && "moviesCard"} ${(isSavedList && !isSaved) && "moviesCard__hiddenElement"}`}>
      <div className="moviesCard__image">
        <button className={`moviesCard__icon ${isSaved ? "moviesCard__hiddenElement" : "moviesCard__saveButton"}`}>Сохранить</button>
        <button className={`moviesCard__icon ${isSavedList ? "moviesCard__deleteButton" : "moviesCard__hiddenElement"}`}></button>
      </div>
      <div className="moviesCard__bottom">
        <h2 className="moviesCard__name">33 слова о дизайне</h2>
        <div className="moviesCard__duration">
          <p className="moviesCard__durationValue">1ч42м</p>
        </div>
      </div>
      <div className={`moviesCard__icon ${isSaved && "moviesCard__savedIcon"} ${isSavedList && "moviesCard__hiddenElement"}`}></div>
    </li>
  )
}

export default MoviesCard;
