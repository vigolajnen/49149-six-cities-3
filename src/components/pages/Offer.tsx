import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual } from 'react-redux';

import { Place } from '@/types';
import { AuthStatus } from '@enums/auth';

import { useTypedActions } from '@hooks/useTypedActions';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { selectActivePointPlace, selectAuthorizationStatus } from '@store/selectors';
import { useGetNearbyOffersQuery, useGetOfferQuery, useToggleFavoriteMutation } from '@services/api';

import Spinner from '@/components/ui/Spinner';
import Map from '@/components/blocks/map/Map';
import PageNotFound from '@components/pages/NotFound';
import Reviews from '@/components/blocks/reviews/Reviews';
import OfferHost from '@/components/blocks/offer/OfferHost';
import OfferPrice from '@/components/blocks/offer/OfferPrice';
import NearPlaces from '@/components/blocks/offer/NearPlaces';
import OfferInside from '@/components/blocks/offer/OfferInside';
import OfferRating from '@/components/blocks/offer/OfferRating';
import OfferGallery from '@/components/blocks/offer/OfferGallery';
import OfferFeatures from '@/components/blocks/offer/OfferFeatures';
import OfferMarkPremium from '@/components/blocks/offer/OfferMarkPremium';
import OfferBookmarkButton from '@/components/blocks/offer/OfferBookmarkButton';

export default function Offer({ hasAccess }: { hasAccess: AuthStatus }) {
  const { id, city } = useParams();
  const { setActivePointPlace } = useTypedActions();
  const { data: offer, isLoading } = useGetOfferQuery(id, { skip: !id });
  const { data: nearPlaces, isLoading: isNearLoading } = useGetNearbyOffersQuery(id as string, { skip: !offer });

  const [mapNearPlaces, setMapNearPlaces] = useState<Place[]>([]);
  const [toggleFavorite] = useToggleFavoriteMutation();

  const { authorizationStatus, activePointPlace } = useTypedSelector(
    (state) => ({
      authorizationStatus: selectAuthorizationStatus(state),
      activePointPlace: selectActivePointPlace(state),
    }),
    shallowEqual, // Добавляем поверхностное сравнение
  );

  // Функция обработки избранного
  const handleToggleFavorite = (offerId: string, isFavorite: boolean) => {
    if (!activePointPlace) {
      return;
    }

    toggleFavorite({
      status: isFavorite ? 1 : 0,
      favorite: activePointPlace,
      offerId,
    });
  };

  useEffect(() => {
    if (!!offer && !isLoading && id) {
      setActivePointPlace(offer);
    }
  }, [id, offer, isLoading, activePointPlace]);

  useEffect(() => {
    if (nearPlaces && activePointPlace) {
      const resultArray = [...nearPlaces.slice(0, 3), activePointPlace];
      setMapNearPlaces(resultArray);
    }
  }, [nearPlaces, activePointPlace]);

  if (!nearPlaces || !offer) {
    if (isNearLoading || isLoading) {
      return <Spinner />;
    }
    return <PageNotFound />;
  }

  if (!activePointPlace) {
    return <PageNotFound />;
  }

  return (
    <main className='page__main page__main--offer'>
      <section className='offer'>
        <OfferGallery />

        <div className='offer__container container'>
          <div className='offer__wrapper'>
            <OfferMarkPremium isPremium={activePointPlace.isPremium} />

            <div className='offer__name-wrapper'>
              <h1 className='offer__name'>{activePointPlace.title}</h1>
              <OfferBookmarkButton isFavorite={activePointPlace.isFavorite} offerId={activePointPlace.id} onToggleFavorite={handleToggleFavorite} authorizationStatus={authorizationStatus} />
            </div>

            <OfferRating rating={activePointPlace.rating} id={activePointPlace.id} />
            <OfferFeatures type={activePointPlace.type} />
            <OfferPrice price={activePointPlace.price} />

            <OfferInside />
            <OfferHost />

            <Reviews hasAccess={hasAccess} />
          </div>
        </div>

        {mapNearPlaces.length > 0 ? <Map points={mapNearPlaces} id={id} city={city} /> : null}
      </section>
      <div className='container'>
        <NearPlaces data={mapNearPlaces.slice(0, 3)} />
      </div>
    </main>
  );
}
