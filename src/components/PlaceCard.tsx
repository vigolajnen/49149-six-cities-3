import { Link } from 'react-router-dom';
import { Place } from '../types';
import { Paths } from '../enums/paths';
import { useState } from 'react';

type CardProps = {
  card: Place;
  styled?: string;
  isBookmarkActive?: boolean;
};

export default function PlaceCard({ card, styled = 'cities', isBookmarkActive = false }: CardProps): JSX.Element {
  const { name, price, rating, type, poster, isPremium, id } = card;
  const [hasHoverClass, setHasHoverClass] = useState(false);

  const handleMouseOver = () => {
    setHasHoverClass(true);
  };

  const handleMouseOut = () => {
    setHasHoverClass(false);
  };
  return (
    <article className={`${styled}__card place-card`}>
      {isPremium && (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      )}
      <div className={`${styled}__image-wrapper place-card__image-wrapper`}>
        <Link to={Paths.Offer.replace(':id', String(id))} style={{ opacity: hasHoverClass ? 0.5 : 1 }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <img className='place-card__image' src={poster} width={styled === 'favorites' ? '150' : '260'} height={styled === 'favorites' ? '110' : '200'} alt='Place image' />
        </Link>
      </div>
      <div className={`${styled}__card-info place-card__info`}>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isBookmarkActive ? 'place-card__bookmark-button--active' : ''}`} type='button'>
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>{isBookmarkActive ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: rating }}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={Paths.Offer.replace(':id', String(id))} style={{ color: hasHoverClass ? 'red' : 'inherit' }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {name}
          </Link>
        </h2>
        <p className='place-card__type'>{type}</p>
      </div>
    </article>
  );
}
