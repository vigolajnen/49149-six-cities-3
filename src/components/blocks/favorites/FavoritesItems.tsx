import { Place } from '@/types';
import PlaceCard from '@/components/blocks/place/PlaceCard';

type FavoritesItemsProps = {
  items: Record<string, Place[] | undefined>;
  children: React.ReactNode;
};
export default function FavoritesItems({ items, children }: FavoritesItemsProps) {
  return (
    <div className='page'>
      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <ul className='favorites__list'>
              {Object.entries(items).map(([city, places]) => (
                <li key={city} className='favorites__locations-items'>
                  <div className='favorites__locations locations locations--current'>
                    <div className='locations__item'>
                      <a className='locations__item-link' href='#'>
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className='favorites__places'>{places && places.map((place: Place) => <PlaceCard key={place.id} card={place} styled='favorites' />)}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      {children}
    </div>
  );
}
