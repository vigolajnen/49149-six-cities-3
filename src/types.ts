export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};
export type City = {
  name: string;
  location: Location;
};

export type Place = {
  id: number;
  city: string;
  name: string;
  poster: string;
  price: number;
  rating: string;
  type: string;
  isPremium?: boolean;
  coordinates: Location;
};

export type StarRating = {
  value: string;
  title: string;
};

export type ReviewFormData = {
  rating: string;
  review: string;
};

//
export type CityPlace = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  location: Location;
};
