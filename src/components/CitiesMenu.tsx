import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useTypedActions } from '../hooks/useTypedActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Paths } from '../enums/paths';

export default function CitiesMenu() {
  const { city: paramCity } = useParams();

  const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
  const activeCity = useTypedSelector((state: { app: { activeCity: string } }) => state.app.activeCity);
  const { changeCity } = useTypedActions();

  const handleClick = () => {
    changeCity(paramCity ?? 'Paris');
  };

  useEffect(() => {
    changeCity(paramCity ?? 'Paris');
  }, [paramCity]);

  return (
    <section className='locations container'>
      <ul className='locations__list tabs__list'>
        {CITIES.map((city: string) => (
          <li className='locations__item' key={city}>
            <Link onClick={handleClick} to={Paths.MainCity.replace(':city', city.toLocaleLowerCase())} className={`locations__item-link tabs__item ${city === activeCity || city.toLocaleLowerCase() === paramCity ? 'tabs__item--active' : ''}`}>
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
