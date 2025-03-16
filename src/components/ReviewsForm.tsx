import { useEffect, useState } from 'react';

import RatingStars from './RatingStars';

export default function ReviewsForm() {
  const [rating, setRating] = useState<string>('0');
  const [review, setReview] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'rating') {
      setRating(value);
    } else if (name === 'review') {
      setReview(value);
    }
  };

  useEffect(() => {
    setIsDisabled(Number(rating) === 0 || review.length < 5);
  }, [rating, review]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(`Rating: ${rating}, Review: ${review}`);
    setRating('0');
    setReview('');
  };

  return (
    <form className='reviews__form form' action='#' method='post' onSubmit={handleFormSubmit}>
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>
      <div className='reviews__rating-form form__rating'>
        <RatingStars rating={rating} handleFieldChange={handleFieldChange} />
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        value={review}
        onChange={handleFieldChange}
        required
      />

      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button className='reviews__submit form__submit button' type='submit' disabled={isDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
}
