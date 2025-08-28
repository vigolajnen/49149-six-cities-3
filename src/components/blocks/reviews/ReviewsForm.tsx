import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAddCommentMutation } from '../../../services/api';
import RatingStars from '../../ui/RatingStars';
import Spinner from '../../ui/Spinner';

import { ApiError } from '../../../types';

export default function ReviewsForm() {
  const { id } = useParams();
  const [rating, setRating] = useState<string>('0');
  const [review, setReview] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [addComment, { isLoading }] = useAddCommentMutation();

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'rating') {
      setRating(value);
    } else if (name === 'review') {
      setReview(value);
    }
  };

  const resetForm = () => {
    setRating('0');
    setReview('');
  };

  useEffect(() => {
    setIsDisabled(Number(rating) === 0 || review.length < 5);
  }, [rating, review]);

  const handleFormSubmitAsync = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await addComment({ rating: Number(rating), comment: review, offerId: id }).unwrap();
      resetForm();
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.data?.details?.[0]?.messages?.[0]);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    void handleFormSubmitAsync(event);
  };

  if (isLoading) {
    return <Spinner />;
  }

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
