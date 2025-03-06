import { FavoritesCardProps, PlaceCardProps } from './types';

export const DATA: PlaceCardProps[] = [
  {
    id: 1,
    name: 'Beautiful &amp; luxurious apartment at great location',
    price: 80,
    rating: '80%',
    type: 'Room',
    isPremium: true,
    poster: 'img/apartment-01.jpg',
  },
  {
    id: 2,
    name: 'Canal View Prinsengracht',
    price: 132,
    rating: '80%',
    type: 'Apartment',
    isPremium: false,
    poster: 'img/apartment-02.jpg',
  },
  {
    id: 3,
    name: 'Nice, cozy, warm big bed apartment',
    price: 180,
    rating: '100%',
    type: 'Apartment',
    isPremium: true,
    poster: 'img/apartment-03.jpg',
  },
  {
    id: 4,
    name: 'Wood and stone place',
    price: 80,
    rating: '80%',
    type: 'Room',
    isPremium: false,
    poster: 'img/room.jpg',
  },
];

export const DATA_FAVORITES: FavoritesCardProps[] = [
  {
    id: 1,
    city: 'Amsterdam',
    name: 'Nice, cozy, warm big bed apartment',
    price: 180,
    rating: '100%',
    type: 'Apartment',
    isPremium: true,
    poster: 'img/apartment-small-03.jpg',
  },
  {
    id: 2,
    city: 'Amsterdam',
    name: 'Wood and stone place',
    price: 80,
    rating: '80%',
    type: 'Room',
    isPremium: false,
    poster: 'img/room-small.jpg',
  },
  {
    id: 3,
    city: 'Cologne',
    name: 'White castle',
    price: 180,
    rating: '100%',
    type: 'Apartment',
    isPremium: true,
    poster: 'img/apartment-small-04.jpg',
  },
];
