import { Place } from "@/types";
import Map from "@/components/blocks/map/Map";

interface MapSectionProps {
  hasPlaces: boolean;
  points: Place[];
  city: string;
}

const MapSection: React.FC<MapSectionProps> = ({ hasPlaces, points, city }) => {
  return <div className='cities__right-section'>{hasPlaces ? <Map points={points} city={city} /> : <section className='cities__map map'></section>}</div>;
};

export default MapSection;
