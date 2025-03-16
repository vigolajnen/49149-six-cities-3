import { Link } from 'react-router-dom';

import { Place } from '../types';
import { Paths } from '../enums/paths';
import PlaceCard from './PlaceCard';
import { FAVORITE_PLACES } from '../mocks/favorites';

const filterFavoritePlacesByCity = (city: string, data: Place[]) => {
  const filteredPlaces = data.filter((place: Place) => place.city === city);
  return filteredPlaces;
};

const amsterdamFavorites = filterFavoritePlacesByCity('Amsterdam', FAVORITE_PLACES);
const cologneFavorites = filterFavoritePlacesByCity('Cologne', FAVORITE_PLACES);

export default function Favorites() {
  return (
    <div className='page'>
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
