import { reviews } from '../mocks/reviews';
import { AuthStatus } from '../enums/auth';
import ReviewsForm from './ReviewsForm';
import ReviewsList from './ReviewsList';

type ReviewsProps = {
  hasAccess: AuthStatus;
};

export default function Reviews({ hasAccess }: ReviewsProps) {
  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>
        Reviews &middot; <span className='reviews__amount'>{reviews.length}</span>
      </h2>
      <ReviewsList />
      {hasAccess === AuthStatus.Auth ? <ReviewsForm /> : null}
    </section>
  );
}
