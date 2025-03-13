type FeedbackUserProps = {
  avatar?: string;
  name: string;
  rating: string;
  review: string;
  time: string;
};

function formatDate(dateString: string): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const dateParts = dateString.split('-');
  const year = dateParts[0];
  const monthIndex = parseInt(dateParts[1], 10) - 1;
  const monthName = months[monthIndex];

  return `${monthName} ${year}`;
}
export default function ReviewsUser({ name, rating = '80', review, time = '2019-04-24', avatar = 'img/avatar-max.jpg' }: FeedbackUserProps) {
  return (
    <li className='reviews__item'>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img className='reviews__avatar user__avatar' src={avatar} width='54' height='54' alt='Reviews avatar' />
        </div>
        <span className='reviews__user-name'>{name}</span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span style={{ width: `${rating}%` }}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text'>{review}</p>
        <time className='reviews__time' dateTime={time}>
          {formatDate(time)}
        </time>
      </div>
    </li>
  );
}
