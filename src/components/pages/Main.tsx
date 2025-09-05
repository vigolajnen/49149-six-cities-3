import { useEffect, useMemo } from 'react';
import { shallowEqual } from 'react-redux';

import CitiesMenu from '@/components/blocks/main/CitiesMenu';
import MainCities from '@/components/blocks/main/MainCities';
import Spinner from '@/components/ui/Spinner';

import { useTypedActions } from '@hooks/useTypedActions';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { useGetOffersQuery } from '@services/api';
import { selectActiveCity, selectorActiveCityPlaces, selectorCombinedPlaces, selectPlacesCount } from '@store/selectors';

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

      <MainCities activeCity={activeCity} placesCount={placesCount} dataCityPlaces={dataCityPlaces} mapPoints={mapPoints} />
    </main>
  );
}
