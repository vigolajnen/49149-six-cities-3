import { DivIcon, Marker, layerGroup } from 'leaflet';
import { memo, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { Paths } from '../../../enums/paths';
import useMap from '../../../hooks/useMap';
import { Place } from '../../../types';

import useScrollTo from '../../../hooks/useScrollTo';
import { useTypedActions } from '../../../hooks/useTypedActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { selectActivePointPlace } from '../../../store/selectors';

import 'leaflet/dist/leaflet.css';
import styles from '../../../styles/map.module.css';

type MapProps = {
  points: Place[];
  id?: string;
  city: string;
};

// Единый SVG шаблон для всех маркеров
const markerSvgTemplate = (isActive: boolean) => `
  <svg width="27" height="39" xmlns="http://www.w3.org/2000/svg">
    <path class="${isActive ? styles.markerPathActive : styles.markerPath}"
          d="M23.856 17.929a11.733 11.733 0 0 0 1.213-5.196C25.07 6.253 19.816 1 13.336 1c-1.835 0-3.643.44-5.272 1.285C2.444 5.197.248 12.113 3.16 17.733l9.736 18.792a1 1 0 0 0 1.784-.017l9.176-18.58z"
          fill-rule="evenodd"/>
  </svg>
`;

function Map({ points, id, city }: MapProps) {
  const { scrollToElement } = useScrollTo();
  const { pathname } = useLocation() as { pathname: Paths };
  const isOffer = pathname === (Paths.Offer.replace(':city', String(city)).replace(':id', String(id)) as Paths);
  const { setActivePointPlace } = useTypedActions();
  const activePointPlace = useTypedSelector(selectActivePointPlace);

  const mapRef = useRef<HTMLDivElement>(null);
  const markersLayerRef = useRef<ReturnType<typeof layerGroup>>();
  const map = useMap(mapRef, points);
  const markersRef = useRef<Marker[]>([]);

  const handlePointClick = useCallback(
    (point: Place) => {
      setActivePointPlace(point);
      scrollToElement(point.id);
    },
    [setActivePointPlace, scrollToElement],
  );

  useEffect(() => {
    if (!map || !Array.isArray(points) || points.length === 0) {
      return;
    }

    // Удаление существующих маркеров
    if (markersLayerRef.current) {
      map.removeLayer(markersLayerRef.current);
    }
    markersRef.current = [];

    const layer = layerGroup();
    markersLayerRef.current = layer;

    points.forEach((point) => {
      if (!point?.location?.latitude || !point?.location?.longitude) {
        return;
      }

      const isActive = point.id === activePointPlace?.id || point.id === id;
      const className = `custom-marker ${isActive ? 'active-marker' : ''}`;

      const icon = new DivIcon({
        html: markerSvgTemplate(isActive),
        className: className,
        iconSize: [32, 50],
        iconAnchor: [16, 50],
      });

      const marker = new Marker([point.location.latitude, point.location.longitude], {
        icon: icon,
      });

      marker.on('click', () => handlePointClick(point));
      layer.addLayer(marker);
      markersRef.current.push(marker);
    });

    map.addLayer(layer);

    return () => {
      if (markersLayerRef.current) {
        map.removeLayer(markersLayerRef.current);
      }
    };
  }, [map, points, activePointPlace?.id, id, handlePointClick]);

  return <section ref={mapRef} className={`map ${isOffer ? 'offer__map' : 'cities__map'}`}></section>;
}

export default memo(Map);
