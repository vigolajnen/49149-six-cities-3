import { useCallback, useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { City, Place } from '../types';
import useMap from '../hooks/useMap';

import IconPoint from '../../public/img/pin.svg';
import IconPointActive from '../../public/img/pin-active.svg';
import { useLocation, useParams } from 'react-router-dom';
import { Paths } from '../enums/paths';
import { MapClass } from '../enums/mapClass';

type MapProps = {
  points: Place[];
};

export default function Map(points: MapProps) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const typePathname = pathname as Paths;
  const activeOfferPath = Paths.Offer.replace(':id', String(id)) as Paths;
  const isMain = typePathname === Paths.Main;
  const isOffer = typePathname === activeOfferPath;

  const mapRef = useRef(null);
  const city: City = {
    name: 'Amsterdam',
    center: {
      lat: 52.3609553943508,
      lng: 4.85309666406198,
    },
    zoom: 11,
  };
  const map = useMap(mapRef, city);

  const activePointRef = useRef<Marker | null>(null);

  const handlePointClick = useCallback((clickedMarker: Marker) => {
    if (activePointRef.current && activePointRef.current !== clickedMarker) {
      activePointRef.current.setIcon(
        new Icon({
          iconUrl: IconPoint,
          iconSize: [32, 50],
          iconAnchor: [20, 50],
        }),
      );
    }

    clickedMarker.setIcon(
      new Icon({
        iconUrl: IconPointActive,
      }),
    );

    activePointRef.current = clickedMarker;
  }, []);

  useEffect(() => {
    if (map) {
      const layer = layerGroup();
      points.points.forEach((point: Place) => {
        const marker = new Marker({
          lat: point.coordinates.lat,
          lng: point.coordinates.lng,
        });
        marker.setIcon(
          new Icon({
            iconUrl: IconPoint,
            iconSize: [32, 50],
            iconAnchor: [20, 50],
          }),
        );
        marker.on('click', () => handlePointClick(marker));
        layer.addLayer(marker);
      });
      map.addLayer(layer);
    }
  }, [map, handlePointClick, points]);

  return <section ref={mapRef} className={`map ${isMain ? MapClass.Main : ''} ${isOffer ? MapClass.Offer : ''}`}></section>;
}
