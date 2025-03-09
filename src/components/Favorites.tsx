import { Link } from 'react-router-dom';

import { Place } from '../types';
import { FAVORITE_PLACES } from '../data';
import PlaceCard from './PlaceCard';
import { Paths } from '../enums/paths';

const filterFavoritePlacesByCity = (city: string, data: Place[]) => {
  const filteredPlaces = data.filter((place: Place) => place.city === city);
  return filteredPlaces;
};

const amsterdamFavorites = filterFavoritePlacesByCity('Amsterdam', FAVORITE_PLACES);
const cologneFavorites = filterFavoritePlacesByCity('Cologne', FAVORITE_PLACES);

export default function Favorites() {
  return (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Link className='header__logo-link' to={Paths.Main}>
                <img className='header__logo' src='img/logo.svg' alt='6 cities logo' width='81' height='41' />
              </Link>
            </div>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <a className='header__nav-link header__nav-link--profile' href='#'>
                    <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                    <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
                    <span className='header__favorite-count'>3</span>
                  </a>
                </li>
                <li className='header__nav-item'>
                  <a className='header__nav-link' href='#'>
                    <span className='header__signout'>Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <ul className='favorites__list'>
              <li className='favorites__locations-items'>
                <div className='favorites__locations locations locations--current'>
                  <div className='locations__item'>
                    <a className='locations__item-link' href='#'>
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className='favorites__places'>
                  {amsterdamFavorites.map((place: Place) => (
                    <PlaceCard key={place.name} card={place} styled='favorites' isBookmarkActive />
                  ))}
                </div>
              </li>

              <li className='favorites__locations-items'>
                <div className='favorites__locations locations locations--current'>
                  <div className='locations__item'>
                    <a className='locations__item-link' href='#'>
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className='favorites__places'>
                  {cologneFavorites.map((place: Place) => (
                    <PlaceCard key={place.name} card={place} styled='favorites' isBookmarkActive />
                  ))}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className='footer container'>
        <Link className='footer__logo-link' to={Paths.Main}>
          <img className='footer__logo' src='img/logo.svg' alt='6 cities logo' width='64' height='33' />
        </Link>
      </footer>
    </div>
  );
}
