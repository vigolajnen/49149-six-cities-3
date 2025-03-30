import { Review, reviews } from '../mocks/reviews';
import ReviewsItem from './ReviewsItem';

export default function ReviewsList() {
  return (
    <ul className='reviews__list'>
      {reviews.map((review: Review) => (
        <ReviewsItem name={review.user.name} rating={review.rating.toString()} review={review.comment} time={review.date} key={review.id} />
      ))}
    </ul>
  );
}
