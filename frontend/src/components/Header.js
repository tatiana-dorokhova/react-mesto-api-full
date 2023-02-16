import { Link, useLocation } from 'react-router-dom';

// в зависимости от того, залогинен пользователь или нет, показываем так:
// залогинен - email и ссылка Выйти
// не залогинен:
// экран регистрации - ссылка Войти
// экран логина - ссылка Регистрация

function Header(props) {
  const location = useLocation();

  return (
    <header className="header section">
      <img className="header__logo" src={props.src} alt={props.alt} />
      <div className="header__info-panel">
        {location.pathname === '/sign-up' && (
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        )}
        {location.pathname === '/sign-in' && (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        )}
        {location.pathname === '/' && (
          <>
            <p className="header__text">{props.email}</p>
            <button type="button" className="header__link" onClick={props.onSignOut}>
              Выйти
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
