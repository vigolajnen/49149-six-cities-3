import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Place } from '../types';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, points: Place[]): Map | undefined {
  const [map, setMap] = useState<Map>();
  const isRenderedRef = useRef<boolean>(false);

  const mapCenter = useMemo(() => {
    if (!Array.isArray(points) || points.length === 0) {
      throw new Error('Массив точек пуст');
    }

    let sumLat = 0;
    let sumLng = 0;
    let sumZoom = 0;

    points.forEach((place: Place) => {
      sumLat += place.city.location.latitude;
      sumLng += place.city.location.longitude;
      sumZoom += place.city.location.zoom;
    });

    const centerLat = sumLat / points.length;
    const centerLng = sumLng / points.length;
    const centerZoom = sumZoom / points.length;

    return { latitude: centerLat, longitude: centerLng, zoom: centerZoom };
  }, [points]);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, { center: [mapCenter.latitude, mapCenter.longitude], zoom: mapCenter.zoom ?? 10 });

      const layer = new TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      });

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, mapCenter]);

  useEffect(() => {
    if (map && mapCenter) {
      map.setView([mapCenter.latitude, mapCenter.longitude], mapCenter.zoom ?? 10);
    }
  }, [map, mapCenter]);

  return map;
}

export default useMap;
