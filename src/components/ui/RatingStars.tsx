
import { Fragment } from 'react';
import { StarRating } from '../../types';

const ratingStars: StarRating[] = [
  { value: '5', title: 'perfect' },
  { value: '4', title: 'good' },
  { value: '3', title: 'not bad' },
  { value: '2', title: 'badly' },
  { value: '1', title: 'terribly' },
];

type RatingStarsProps = {
  rating: string;
  handleFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RatingStars({ rating = '0', handleFieldChange }: RatingStarsProps) {
  return ratingStars.map((star: StarRating) => (
    <Fragment key={star.value}>
      <input className='form__rating-input visually-hidden' name='rating' value={star.value} checked={rating === star.value} id={`${star.value}-stars`} type='radio' onChange={handleFieldChange} />
      <label htmlFor={`${star.value}-stars`} className='reviews__rating-label form__rating-label' title={star.title}>
        <svg className='form__star-image' width='37' height='33'>
          <use xlinkHref='#icon-star'></use>
        </svg>
      </label>
    </Fragment>
  ));
}

