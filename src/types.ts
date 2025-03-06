export type PlaceCardProps = {
  id: number;
  name: string;
  poster: string;
  price: number;
  rating: string;
  type: string;
  isPremium?: boolean;
}

export type FavoritesCardProps = PlaceCardProps & {
  city: string;
};
