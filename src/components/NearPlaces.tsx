import { useParams } from 'react-router-dom';
import { PLACES } from '../mocks/places';

import { Place } from '../types';
import PlaceCard from './PlaceCard';

export default function NearPlaces() {
  const { id } = useParams();
  const nearPlaces = PLACES.filter((place: Place) => place.id !== +id!);

  return (
    <section className='near-places places'>
      <h2 className='near-places__title'>Other places in the neighbourhood</h2>
      <div className='near-places__list places__list'>
        {nearPlaces.map((v: Place) => (
          <PlaceCard key={v.id} card={v} styled='near-places' />
        ))}
      </div>
    </section>
  );
}
