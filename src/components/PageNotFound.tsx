import { Link } from 'react-router-dom';
import { Paths } from '../enums/paths';

export default function PageNotFound() {
  return (
    <main className='page__main page__main--index page__main--index-empty' style={{ minHeight: '80vh' }}>
      <div className='cities'>
        <div className='cities__places-container cities__places-container--empty container'>
          <section className='cities__no-places'>
            <div className='cities__status-wrapper tabs__content'>
              <b className='cities__status'>404</b>
              <p className='cities__status-description'>Нет такой страницы</p>
              <Link to={Paths.Main} style={{ textDecoration: 'underline' }}>
                На главную
              </Link>
            </div>
          </section>
          <div className='cities__right-section'></div>
        </div>
      </div>
    </main>
  );
}
