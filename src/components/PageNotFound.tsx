import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className='page page--gray page--main'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <a className='header__logo-link header__logo-link--active'>
                <img className='header__logo' src='img/logo.svg' alt='6 cities logo' width='81' height='41' />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className='page__main page__main--index page__main--index-empty'>
        <div className='cities'>
          <div className='cities__places-container cities__places-container--empty container'>
            <section className='cities__no-places'>
              <div className='cities__status-wrapper tabs__content'>
                <b className='cities__status'>404</b>
                <p className='cities__status-description'>Нет такой страницы</p>
                <Link to='/' style={{ textDecoration: 'underline' }}>
                  На главную
                </Link>
              </div>
            </section>
            <div className='cities__right-section'></div>
          </div>
        </div>
      </main>
    </div>
  );
}
