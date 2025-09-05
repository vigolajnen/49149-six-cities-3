import { memo } from 'react';

import { Place } from '@/types';
import SortingOptions from '@/components/blocks/main/SortingOptions';
import PlaceCard from '@/components/blocks/place/PlaceCard';

type PlaceCardListProps = {
  placesCount: number;
  activeCity: string;
  dataCityPlaces: Place[];
};

function PlaceCardList({ placesCount = 0, activeCity = '', dataCityPlaces = [] }: PlaceCardListProps) {
  return (
    <section className='cities__places places'>
      <h2 className='visually-hidden'>Places</h2>
      <b className='places__found'>
        {placesCount} places to stay in {activeCity}
      </b>
      <SortingOptions />
      <div className='cities__places-list places__list tabs__content'>
        {dataCityPlaces.map((place: Place) => (
          <PlaceCard key={place.id} card={place} />
        ))}
      </div>
    </section>
  );
}

export default memo(PlaceCardList);
