import { useEffect, useState } from 'react';

import { useGetFavoriteQuery } from '../../services/api';
import { Place } from '../../types';
import PlaceCard from '../blocks/place/PlaceCard';
import Footer from '../layout/Footer';
import Spinner from '../ui/Spinner';

export default function Favorites() {
  const { data: favorites, isLoading } = useGetFavoriteQuery();
  const [favoritesGroupCity, setFavoritesGroupCity] = useState<Record<string, typeof favorites>>({});

  useEffect(() => {
    if (favorites && !isLoading) {
      // Группируем предложения по городам
      const groupedFavoriteByCity = favorites.reduce<Record<string, typeof favorites>>((acc, favorite) => {
        const cityName = favorite.city.name;

        if (!acc[cityName]) {
          acc[cityName] = [];
        }
        acc[cityName].push(favorite);

        return acc;
      }, {});

      setFavoritesGroupCity(groupedFavoriteByCity);
    }
    return () => {
      setFavoritesGroupCity({});
    };
  }, [favorites, isLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={`page ${favorites?.length === 0 ? 'page--favorites-empty' : ''}`}>
      <main className={`page__main page__main--favorites ${favorites?.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className='page__favorites-container container'>
          <section className={`favorites ${favorites?.length === 0 ? 'favorites--empty' : ''}`}>
            {favorites?.length === 0 ? (
              <>
                <h1 className='visually-hidden'>Favorites (empty)</h1>
                <div className='favorites__status-wrapper'>
                  <b className='favorites__status'>Nothing yet saved.</b>
                  <p className='favorites__status-description'>Save properties to narrow down search or plan your future trips.</p>
                </div>
              </>
            ) : (
              <>
                <h1 className='favorites__title'>Saved listing</h1>
                <ul className='favorites__list'>
                  {Object.entries(favoritesGroupCity).map(([city, places]) => (
                    <li key={city} className='favorites__locations-items'>
                      <div className='favorites__locations locations locations--current'>
                        <div className='locations__item'>
                          <a className='locations__item-link' href='#'>
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className='favorites__places'>{places && places.map((place: Place) => <PlaceCard key={place.id} card={place} styled='favorites' />)}</div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
