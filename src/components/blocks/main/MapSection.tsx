import { Place } from '@/types';
import Map from '@/components/blocks/map/Map';

type MapSectionProps = {
  hasPlaces: boolean;
  points: Place[];
  city: string;
};

export default function MapSection({ hasPlaces, points, city }: MapSectionProps) {
  return <div className='cities__right-section'>{hasPlaces ? <Map points={points} city={city} /> : <section className='cities__map map'></section>}</div>;
}
