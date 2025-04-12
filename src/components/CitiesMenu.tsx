import { useTypedActions } from '../hooks/useTypedActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function CitiesMenu() {
  const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
  const activeCity = useTypedSelector((state: { app: { activeCity: string } }) => state.app.activeCity);

  const { changeCity, setActiveCityPlaces } = useTypedActions();

  const handleClick = ({ city }: { city: string }) => {
    changeCity(city);
    setActiveCityPlaces(city);
  };
  return (
    <section className='locations container'>
      <ul className='locations__list tabs__list'>
        {cities.map((city: string) => (
          <li className='locations__item' key={city}>
            {city === activeCity ? (
              <a className='locations__item-link tabs__item tabs__item--active' onClick={() => handleClick({ city })}>
                <span>{city}</span>
              </a>
            ) : (
              <a className='locations__item-link tabs__item' href='#' onClick={() => handleClick({ city })}>
                <span>{city}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
