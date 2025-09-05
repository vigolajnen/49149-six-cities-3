import { Place } from '@/types';
import MapSection from '@components/blocks/main/MapSection';
import CitiesContainer from '@components/blocks/main/CitiesContainer';
import NoPlacesSection from '@components/blocks/main/NoPlacesSection';
import PlaceCardList from '@components/blocks/place/PlaceCardList';

type CitiesProps = {
  activeCity: string;
  placesCount: number;
  dataCityPlaces: Place[];
  mapPoints: Place[];
}

const MainCities = ({ activeCity, placesCount, dataCityPlaces, mapPoints }: CitiesProps) => {
  const hasPlaces = placesCount > 0;
  const containerClass = `cities__places-container container ${!hasPlaces ? 'cities__places-container--empty' : ''}`;

  return (
    <CitiesContainer>
      <div className={containerClass}>
        {!hasPlaces ? <NoPlacesSection activeCity={activeCity} /> : <PlaceCardList placesCount={placesCount} activeCity={activeCity} dataCityPlaces={dataCityPlaces} />}

        <MapSection hasPlaces={hasPlaces} points={mapPoints} city={activeCity} />
      </div>
    </CitiesContainer>
  );
};

export default MainCities;
