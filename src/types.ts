export type Place = {
  id: number;
  city: string;
  name: string;
  poster: string;
  price: number;
  rating: string;
  type: string;
  isPremium?: boolean;
};

export type StarRating = {
  value: string;
  title: string;
};

export type ReviewFormData = {
  rating: string;
  review: string;
};
