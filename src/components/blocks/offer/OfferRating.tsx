import { useMemo } from 'react';

interface OfferRatingProps {
  rating: number;
  id: string;
}

export default function OfferRating({ rating = 0, id }: OfferRatingProps) {
  const styledRating = useMemo(() => id && Math.round(rating * 100) / 5, [rating]);

  return (
    <div className='offer__rating rating'>
      <div className='offer__stars rating__stars'>
        <span style={{ width: `${styledRating}%` }}></span>
        <span className='visually-hidden'>Rating</span>
      </div>
      <span className='offer__rating-value rating__value'>{rating}</span>
    </div>
  );
}
