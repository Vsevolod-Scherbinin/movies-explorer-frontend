import React from "react";
import './AboutMe.css';

function AboutMe (){

  return(
    <section className="aboutMe">
      <div className="aboutMe__header">
        <h3 className="aboutMe__headerTitle">Студент</h3>
      </div>
      <div className="aboutMe__content">
        <div className="aboutMe__info">
          <h2 className="aboutMe__name">Всеволод</h2>
          <h3 className="aboutMe__about">Фронтенд-разработчик, 30 лет</h3>
          <p className="aboutMe__description">
            Я родился и живу в Нижнем Новгороде, закончил факультет менеджмента НИУ ВШЭ.
            Я люблю слушать музыку, путешествовать и много гулять пешком по городам.
            6 лет назад начал кодить, но потом пришлось больше времени уделять основной работе. Недавно решил пойти учиться этой профессии.
          </p>
          <a href="https://github.com/Vsevolod-Scherbinin" className="aboutMe__gitHub" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <div className="aboutMe__photo"></div>
      </div>
    </section>
  )
}

export default AboutMe;

