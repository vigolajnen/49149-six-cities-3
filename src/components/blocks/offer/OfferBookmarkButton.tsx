import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../enums/paths';
import { AuthStatus } from '../../../enums/auth';

type OfferBookmarkButtonProps = {
  isFavorite: boolean;
  authorizationStatus: AuthStatus;
  offerId: string;
  onToggleFavorite: (offerId: string, isFavorite: boolean) => void;
};
export default function OfferBookmarkButton({ isFavorite, offerId, onToggleFavorite, authorizationStatus }: OfferBookmarkButtonProps) {
  const navigate = useNavigate();
  const styleButtonClasses = isFavorite ? 'offer__bookmark-button button offer__bookmark-button--active' : 'offer__bookmark-button button';
  const textHide = isFavorite ? 'In bookmarks' : 'To bookmarks';

  const handleClickButton = () => {
    if (authorizationStatus !== AuthStatus.Auth) {
      navigate(Paths.Login);
      return;
    }

    onToggleFavorite(offerId, !isFavorite);
  };

  return (
    <button className={styleButtonClasses} type='button' onClick={handleClickButton}>
      <svg className='offer__bookmark-icon' width='31' height='33'>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>{textHide}</span>
    </button>
  );
}
