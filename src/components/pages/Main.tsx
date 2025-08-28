import { useEffect, useMemo } from 'react';
import { shallowEqual } from 'react-redux';

import CitiesMenu from '../blocks/main/CitiesMenu';
import Map from '../blocks/map/Map';
import PlaceCardList from '../blocks/place/PlaceCardList';
import Spinner from '../ui/Spinner';

import { useTypedActions } from '../../hooks/useTypedActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useGetOffersQuery } from '../../services/api';
import { selectActiveCity, selectorActiveCityPlaces, selectorCombinedPlaces, selectPlacesCount } from '../../store/selectors';

export default function Main() {
  const { setAllPlaces } = useTypedActions();
  const { data: offers, isLoading } = useGetOffersQuery(undefined, { refetchOnMountOrArgChange: 60000 });

  const activeCityPlaces = useTypedSelector(selectorActiveCityPlaces, shallowEqual);
  const activeCity = useTypedSelector(selectActiveCity);
  const placesCount = useTypedSelector(selectPlacesCount);
  const dataCityPlaces = useTypedSelector(selectorCombinedPlaces);

  const mapPoints = useMemo(() => activeCityPlaces, [activeCityPlaces]);

  useEffect(() => {
    if (offers && !isLoading) {
      setAllPlaces(offers);
    }
  }, [!!offers, isLoading]);

  if (isLoading) {
    return (
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <CitiesMenu />
        <Spinner />
      </main>
    );
  }

  return (
    <main className='page__main page__main--index'>
      <h1 className='visually-hidden'>Cities</h1>
      <CitiesMenu />

      <div className='cities'>
        <div className={`cities__places-container container ${placesCount === 0 ? 'cities__places-container--empty' : ''}`}>
          {activeCityPlaces && placesCount === 0 ? (
            <section className='cities__no-places'>
              <div className='cities__status-wrapper tabs__content'>
                <b className='cities__status'>No places to stay available</b>
                <p className='cities__status-description'>We could not find any property available at the moment in {activeCity}</p>
              </div>
            </section>
          ) : (
            <PlaceCardList placesCount={placesCount} activeCity={activeCity} dataCityPlaces={dataCityPlaces} />
          )}
          <div className='cities__right-section'>{activeCityPlaces && placesCount > 0 ? <Map points={mapPoints} city={activeCity} /> : <section className='cities__map map'></section>}</div>
        </div>
      </div>
    </main>
  );
}
