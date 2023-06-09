import {Route, Link, Routes } from 'react-router-dom';
function Header({userEmail, signOut, openPopupBurger, isActiveAdidasButton}) {
  return (
    <>
      <header className={isActiveAdidasButton ? "header header_type_active" : "header"}>
        <div className="header__logo"></div>
          <Routes>
              <Route path="/sign-up" element={
                  <Link to={"/sign-in"} className="header__link header__link_type_active">Войти</Link>}/>
              <Route path="/sign-in" element={
                  <Link to={"/sign-up"} className="header__link header__link_type_active">Регистрация</Link>}/>
              <Route path="/" element={
                  <>
                      <div className={isActiveAdidasButton ? "header__user_type_active" : "header__user"}>
                          <p className='header__user_type_email'>{userEmail}</p>
                          <button onClick={signOut} className="header__user_type_logout">Выйти</button>
                      </div>
                      <button className={isActiveAdidasButton ? "header__adidas_active header__adidas" : "header__adidas"} onClick={openPopupBurger}>
                          <span className="header__adidas-line"></span>
                          <span className="header__adidas-line"></span>
                          <span className="header__adidas-line"></span>
                      </button>
                  </>
              }/>
          </Routes>
      </header>
    </>
  );
}

export default Header;
