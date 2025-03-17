import { Place } from '../types';

export const FAVORITE_PLACES: Place[] = [
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
