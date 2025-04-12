import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Place } from '../types';
import { AuthStatus } from '../enums/auth';
import Map from './Map';
import Reviews from './Reviews';
import NearPlaces from './NearPlaces';
import OfferGallery from './OfferGallery';
import PageNotFound from './PageNotFound';
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function Offer({ hasAccess }: { hasAccess: AuthStatus }) {
  const { id } = useParams();
  const activeCityPlaces = useTypedSelector((state: { app: { activeCityPlaces: Place[] } }) => state.app.activeCityPlaces);
  const currentPlace = useMemo(() => activeCityPlaces.find((place: Place) => place.id === id), [id, activeCityPlaces]);
  const nearPlaces = useMemo(() => activeCityPlaces.filter((place: Place) => place.id !== id), [id, activeCityPlaces]);

  if (!currentPlace) {
    return <PageNotFound />;
  }

  return (
    <main className='page__main page__main--offer'>
      <section className='offer'>
        <OfferGallery />

        <div className='offer__container container'>
          <div className='offer__wrapper'>
            {currentPlace.isPremium && (
              <div className='offer__mark'>
                <span>Premium</span>
              </div>
            )}
            <div className='offer__name-wrapper'>
              <h1 className='offer__name'>{currentPlace.title}</h1>
              <button className='offer__bookmark-button button' type='button'>
                <svg className='offer__bookmark-icon' width='31' height='33'>
                  <use xlinkHref='#icon-bookmark'></use>
                </svg>
                <span className='visually-hidden'>To bookmarks</span>
              </button>
            </div>
            <div className='offer__rating rating'>
              <div className='offer__stars rating__stars'>
                <span style={{ width: currentPlace.rating * 100 }}></span>
                <span className='visually-hidden'>Rating</span>
              </div>
              <span className='offer__rating-value rating__value'>4.8</span>
            </div>
            <ul className='offer__features'>
              <li className='offer__feature offer__feature--entire'>Apartment</li>
              <li className='offer__feature offer__feature--bedrooms'>3 Bedrooms</li>
              <li className='offer__feature offer__feature--adults'>Max 4 adults</li>
            </ul>
            <div className='offer__price'>
              <b className='offer__price-value'>&euro;{currentPlace.price}</b>
              <span className='offer__price-text'>&nbsp;night</span>
            </div>
            <div className='offer__inside'>
              <h2 className='offer__inside-title'>What&apos;s inside</h2>
              <ul className='offer__inside-list'>
                <li className='offer__inside-item'>Wi-Fi</li>
                <li className='offer__inside-item'>Washing machine</li>
                <li className='offer__inside-item'>Towels</li>
                <li className='offer__inside-item'>Heating</li>
                <li className='offer__inside-item'>Coffee machine</li>
                <li className='offer__inside-item'>Baby seat</li>
                <li className='offer__inside-item'>Kitchen</li>
                <li className='offer__inside-item'>Dishwasher</li>
                <li className='offer__inside-item'>Cabel TV</li>
                <li className='offer__inside-item'>Fridge</li>
              </ul>
            </div>
            <div className='offer__host'>
              <h2 className='offer__host-title'>Meet the host</h2>
              <div className='offer__host-user user'>
                <div className='offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper'>
                  <img className='offer__avatar user__avatar' src='img/avatar-angelina.jpg' width='74' height='74' alt='Host avatar' />
                </div>
                <span className='offer__user-name'>Angelina</span>
                <span className='offer__user-status'>Pro</span>
              </div>
              <div className='offer__description'>
                <p className='offer__text'>A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.</p>
                <p className='offer__text'>
                  An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                </p>
              </div>
            </div>
            <Reviews hasAccess={hasAccess} />
          </div>
        </div>

        <Map points={nearPlaces} id={id} />
      </section>
      <div className='container'>
        <NearPlaces data={nearPlaces} />
      </div>
    </main>
  );
}
