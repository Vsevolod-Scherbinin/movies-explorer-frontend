import React from "react";
import { Link } from 'react-router-dom';
import './Login.css';
import '../AuthForm/AuthForm.css';
import AuthForm from '../AuthForm/AuthForm';

function Login (){
  const email = "test@yandex.ru";
  const password = "test";


  return(
    <section className="login">
      <AuthForm title="Рады видеть!" name="register" buttonText="Войти" >
        <div className="authForm__children">
          <label className="authForm__label" for="email-input">E-mail</label>
          <input type="email" name="email" id="email-input" className="authForm__input"
            value={email}
            placeholder="E-mail" minLength="2" maxLength="30" required />
          <p className="email-input-error authForm__error"></p>

          <label className="authForm__label" for="email-input">Пароль</label>
          <input type="password" name="password" id="password-input" className="authForm__input"
            value={password}
            placeholder="Пароль" required />
          <p className="password-input-error authForm__error">Что-то пошло не так...</p>
        </div>
      </AuthForm>
      <p className="login__question">Ещё не зарегистрированы? <Link className="login__link" to="/sign-up">Регистрация</Link></p>
    </section>
  )
}

export default Login;
