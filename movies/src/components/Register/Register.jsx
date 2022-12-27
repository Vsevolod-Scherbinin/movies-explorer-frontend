import React from "react";
import { Link } from 'react-router-dom';
import './Register.css';
import '../AuthForm/AuthForm.css';
import AuthForm from '../AuthForm/AuthForm';

function Register (){
  const name = "Всеволод";
  const email = "test@yandex.ru";
  const password = "test";


  return(
    <section className="register">
      <AuthForm title="Добро пожаловать!" name="register" buttonText="Зарегистрироваться">
        <div className="authForm__children">
          <label className="authForm__label" for="name-input">Имя</label>
          <input type="name" name="name" id="name-input" className="authForm__input"
            value={name}
            placeholder="Имя" minLength="2" maxLength="30" required />
          <p className="authForm__error"></p>

          <label className="authForm__label" for="email-input">E-mail</label>
          <input type="email" name="email" id="email-input" className="authForm__input"
            value={email}
            placeholder="E-mail" minLength="2" maxLength="30" required />
          <p className="authForm__error"></p>

          <label className="authForm__label" for="email-input">Пароль</label>
          <input type="password" name="password" id="password-input" className="authForm__input"
            value={password}
            placeholder="Пароль" required />
          <p className="authForm__error">Что-то пошло не так...</p>
        </div>
      </AuthForm>
      <p className="register__question">Уже зарегистрированы? <Link className="register__link" to="/sign-in">Войти</Link></p>
    </section>
  )
}

export default Register;
