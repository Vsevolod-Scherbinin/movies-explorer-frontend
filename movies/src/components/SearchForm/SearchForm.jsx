import React from "react";
import './SearchForm.css';

function SearchForm (){

  return(
    <section className="searchForm">
      <div className="searchForm__main">
        <div className="searchForm__inputGroup">
          <div className="searchForm__icon"></div>
          <input type="text" className="searchForm__input" placeholder="Фильм"/>
          <button className="searchForm__searchButton"></button>
        </div>
        <div className="searchForm__switchGroup">
          <label className="searchForm__switch">
            <input name="shortFilm" type="checkbox" className="searchForm__checkbox" />
            <span className="searchForm__switchDecorator"></span>
          </label>
          <p className="searchForm__shortFilms">Короткометражки</p>
        </div>
      </div>
    </section>
  )
}

export default SearchForm;
