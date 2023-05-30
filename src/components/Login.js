import React from 'react';
import { useForm } from '../hooks/useForm';

const Login = ({ onLogin, isLoading }) => {

  // Переписал. ПР.12 В.3. Здесь инпуты обрабатываются хуком useForm
  // В Register.js - по-старому, методом и стейтом в самом компоненте.
  const {values, handleChange, setValues} = useForm({ email: '', password: '' })

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values);
  }

  return(
    <main className="auth">
        <h1 className="auth__header">Вход</h1>
        <form action="#" className="auth__form auth__form_login" name="login" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            className="auth__input auth__input_type_email"
            id="input-email"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <span className="auth__error input-email-error"></span>
          <input
            type="password"
            className="auth__input auth__input_type_password"
            id="input-password"
            placeholder="Пароль"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
          />
          <span className="auth__error input-password-error"></span>

          <button className={`auth__button ${isLoading && 'auth__button_disabled'}`} type="submit" disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>
    </main>
  )

}

export default Login;
