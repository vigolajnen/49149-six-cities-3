import { Fragment, useState } from 'react';
import { ReviewFormData, StarRating } from '../types';
import { AuthStatus } from '../enums/paths';

const ratingStars: StarRating[] = [
  { value: '5', title: 'perfect' },
  { value: '4', title: 'good' },
  { value: '3', title: 'not bad' },
  { value: '2', title: 'badly' },
  { value: '1', title: 'terribly' },
];

type ReviewsFormProps = {
  hasAccess?: AuthStatus;
};

export default function ReviewsForm({ hasAccess = AuthStatus.NoAuth }: ReviewsFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: '0',
    review: '',
  });

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormInvalid = +formData.rating === 0 && formData.review.length < 5;

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(formData);
  };

  if (hasAccess === AuthStatus.NoAuth) {
    return null;
  }

  return (
    <form className='reviews__form form' action='#' method='post' onSubmit={handleFormSubmit}>
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>
      <div className='reviews__rating-form form__rating'>
        {ratingStars.map((star: StarRating) => (
          <Fragment key={star.value}>
            <input
              className='form__rating-input visually-hidden'
              name='rating'
              value={star.value}
              checked={formData.rating === star.value}
              id={`${star.value}-stars`}
              type='radio'
              onChange={handleFieldChange}
            />
            <label htmlFor={`${star.value}-stars`} className='reviews__rating-label form__rating-label' title={star.title}>
              <svg className='form__star-image' width='37' height='33'>
                <use xlinkHref='#icon-star'></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        value={formData.review}
        onChange={handleFieldChange}
        required
      />

      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button className='reviews__submit form__submit button' type='submit' disabled={isFormInvalid}>
          Submit
        </button>
      </div>
    </form>
  );
}
