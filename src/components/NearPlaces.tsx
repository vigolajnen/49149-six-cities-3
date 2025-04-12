import { CityPlace } from '../types';
import PlaceCard from './PlaceCard';

type NearPlacesProps = {
  data: CityPlace[];
};

export default function NearPlaces({ data }: NearPlacesProps) {
  return (
    <section className='near-places places'>
      <h2 className='near-places__title'>Other places in the neighbourhood</h2>
      <div className='near-places__list places__list'>
        {data.map((v: CityPlace) => (
          <PlaceCard key={v.id} card={v} styled='near-places' />
        ))}
      </div>
    </section>
  );
}
