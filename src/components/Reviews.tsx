import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { AuthStatus } from '../enums/auth';
import ReviewsForm from './ReviewsForm';
import ReviewsList from './ReviewsList';
import { useGetOfferCommentsQuery } from '../services/api';
import { Comment } from '../types';

type ReviewsProps = {
  hasAccess: AuthStatus;
};

export default function Reviews({ hasAccess }: ReviewsProps) {
  const { id } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const { data, isLoading, isError } = useGetOfferCommentsQuery(id as string);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setComments(data);
    }
    return () => {};
  }, [isLoading, isError, data]);
  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>
        Reviews &middot; <span className='reviews__amount'>{comments.length}</span>
      </h2>
      <ReviewsList reviews={comments} />
      {hasAccess === AuthStatus.Auth ? <ReviewsForm /> : null}
    </section>
  );
}
