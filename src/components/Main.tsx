import { CityPlace } from '../types';
import PlaceCard from './PlaceCard';

import Map from './Map';
import CitiesMenu from './CitiesMenu';
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function Main() {
  const activeCityPlaces = useTypedSelector((state: { app: { activeCityPlaces: CityPlace[] } }) => state.app.activeCityPlaces);
  const activeCity = useTypedSelector((state: { app: { activeCity: string } }) => state.app.activeCity);

  return (
    <main className='page__main page__main--index'>
      <h1 className='visually-hidden'>Cities</h1>
      <div className='tabs'>
        <CitiesMenu />
      </div>
      <div className='cities'>
        <div className='cities__places-container container'>
          <section className='cities__places places'>
            <h2 className='visually-hidden'>Places</h2>
            <b className='places__found'>
              {activeCityPlaces.length} places to stay in {activeCity}
            </b>
            <form className='places__sorting' action='#' method='get'>
              <span className='places__sorting-caption'>Sort by</span>
              <span className='places__sorting-type' tabIndex={0}>
                Popular
                <svg className='places__sorting-arrow' width='7' height='4'>
                  <use xlinkHref='#icon-arrow-select'></use>
                </svg>
              </span>
              <ul className='places__options places__options--custom places__options--opened'>
                <li className='places__option places__option--active' tabIndex={0}>
                  Popular
                </li>
                <li className='places__option' tabIndex={0}>
                  Price: low to high
                </li>
                <li className='places__option' tabIndex={0}>
                  Price: high to low
                </li>
                <li className='places__option' tabIndex={0}>
                  Top rated first
                </li>
              </ul>
            </form>
            <div className='cities__places-list places__list tabs__content'>
              {activeCityPlaces.map((place: CityPlace) => (
                <PlaceCard key={place.id} card={place} />
              ))}
            </div>
          </section>
          <div className='cities__right-section'>
            <Map points={activeCityPlaces} />
          </div>
        </div>
      </div>
    </main>
  );
}
