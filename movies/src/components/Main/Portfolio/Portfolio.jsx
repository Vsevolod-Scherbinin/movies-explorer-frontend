import React from "react";
import './Portfolio.css';

function Portfolio (){

  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link">
          <a href="https://github.com/Vsevolod-Scherbinin/how-to-learn" className="portfolio__anchor" target="_blank" rel="noreferrer">
            <h3 className="portfolio__project">Статичный сайт</h3>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__link">
          <a href="https://github.com/Vsevolod-Scherbinin/russian-travel" className="portfolio__anchor" target="_blank" rel="noreferrer">
            <h3 className="portfolio__project">Адаптивный сайт</h3>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__link">
          <a href="https://github.com/Vsevolod-Scherbinin/react-mesto-api-full" className="portfolio__anchor" target="_blank" rel="noreferrer">
            <h3 className="portfolio__project">Одностраничное приложение</h3>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
