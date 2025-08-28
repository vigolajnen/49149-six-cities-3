import { Comment } from '../../../types';
import ReviewsItem from './ReviewsItem';

export default function ReviewsList({ reviews }: { reviews: Comment[] }) {
  return (
    <ul className='reviews__list'>
      {reviews.map((review: Comment) => (
        <ReviewsItem name={review.user.name} rating={review.rating.toString()} review={review.comment} time={review.date} key={review.id} />
      ))}
    </ul>
  );
}
