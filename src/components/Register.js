import React from 'react';
import { Link } from 'react-router-dom'; // useNavigate


const Register = ({onRegister}) => {

  const [formValue, setFormValue] = React.useState({ email: '', password: '' });

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(formValue);
  }


  return(
    <main className="auth">
        <h1 className="auth__header">Регистрация</h1>
        <form action="#" className="auth__form auth__form_register" name="register" onSubmit={handleSubmit} noValidate>
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

          <button className="auth__button" type="submit">Зарегистрироваться</button> {/* disabled={isLoading} */}
          <div className="auth__reminder">
            <p className='auth__caption'>Уже зарегистрированы?&nbsp;
              <Link to="/sign-up" className="auth__link">Войти</Link>
            </p>
          </div>
        </form>
    </main>
  )

}

export default Register;

