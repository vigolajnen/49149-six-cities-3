import { useEffect, useState } from 'react';

import { useGetFavoriteQuery } from '@services/api';
import Spinner from '@/components/ui/Spinner';
import Footer from '@/components/layout/Footer';
import FavoritesEmpty from '@/components/blocks/favorites/FavoritesEmpty';
import FavoritesItems from '@/components/blocks/favorites/FavoritesItems';

export default function Favorites() {
  const { data: favorites, isLoading } = useGetFavoriteQuery();
  const [favoritesGroupCity, setFavoritesGroupCity] = useState<Record<string, typeof favorites>>({});

  useEffect(() => {
    if (favorites && !isLoading) {
      // Группируем предложения по городам
      const groupedFavoriteByCity = favorites.reduce<Record<string, typeof favorites>>((acc, favorite) => {
        const cityName = favorite.city.name;

        if (!acc[cityName]) {
          acc[cityName] = [];
        }
        acc[cityName].push(favorite);

        return acc;
      }, {});

      setFavoritesGroupCity(groupedFavoriteByCity);
    }
    return () => {
      setFavoritesGroupCity({});
    };
  }, [favorites, isLoading]);

  if (favorites?.length === 0) {
    return (
      <FavoritesEmpty>
        <Footer />
      </FavoritesEmpty>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FavoritesItems items={favoritesGroupCity}>
      <Footer />
    </FavoritesItems>
  );
}
