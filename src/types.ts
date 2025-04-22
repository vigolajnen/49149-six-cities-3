
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

export type StarRating = {
  value: string;
  title: string;
};

export type ReviewFormData = {
  rating: string;
  review: string;
};

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  expiresAt: string;
};

export type ApiError = {
  data?: {
    details?: {
      messages?: string[];
    }[];
  };
};

export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
