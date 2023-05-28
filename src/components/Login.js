import React from 'react';
// import './Login.css';


const Login = ({formValue, setFormValue, onLogin}) => { //setInfoTooltipOpen, setSuccessAuth

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin();
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
            value={formValue.email}
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
            value={formValue.password}
            onChange={handleChange}
            required
          />
          <span className="auth__error input-password-error"></span>

          <button className="auth__button" type="submit">Войти</button> {/* disabled={isLoading} */}
        </form>
    </main>
  )

}

export default Login;