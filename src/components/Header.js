import { Routes, Route, Link } from "react-router-dom";

function Header({ onSignOut, isLoggedIn, userData }) {

  return (
    <header className="header">

      <Link to="/" className="header__link-logo"><div className="header__logo"></div></Link> {/* Убрать Link у логотипа? */}

      {/* <button className="header__close-button" type="button" aria-label="Закрыть"></button> */}
      {/* <button className="header__menu-button" type="button" aria-label="Меню"></button> */}

      <nav className="header__nav-container">
        <ul className="header__nav-list">
          <Routes>
            <Route path="/" element={ <>
              <li className="header__nav-item">{userData.email}</li>
              <li className="header__nav-item">
                <Link to="/" className="header__nav-link" onClick={onSignOut}>Выйти</Link>
              </li>
            </> } />
            <Route path="/sign-up" element={
              <li className="header__nav-item"><Link to="/sign-in" className="header__nav-link">Регистрация</Link></li>
            } />
            <Route path="/sign-in" element={
              <li className="header__nav-item"><Link to="/sign-up" className="header__nav-link">Войти</Link></li>
            } />
          </Routes>
        </ul>
      </nav>


      {/* <ul className="header__nav-container">
        {!isLoggedIn ? (
        <>
          <li className="header__nav-item">
            <Link to="/sign-up" className="header__nav-link">Войти</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/sign-in" className="header__nav-link">Регистрация</Link>
          </li>
        </>
        ) : (
        <>
          <li className="header__nav-item">asdasdasd@sdfsdf.ry</li>
          <li className="header__nav-item">
            <Link to="/" className="header__nav-link" onClick={onSignOut}>Выйти</Link>
          </li>
          </>
        )}
      </ul> */}
      {/* <button className="header__close-button" type="button" aria-label="Закрыть"></button>
      <button className="header__menu-button" type="button" aria-label="Меню"></button> */}
    </header>
  );
}

export default Header;
