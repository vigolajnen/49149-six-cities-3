import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PLACES } from '../mocks/places';
import { Place } from '../types';

const initialState = {
  activeCity: '',
  activeCityPlaces: [] as Place[],
  sortedCityPlaces: [] as Place[],
  activePointPlace: {} as Place,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.activeCity = action.payload;
      state.sortedCityPlaces = [];
    },
    setActiveCityPlaces: (state, action: PayloadAction<string>) => {
      state.activeCityPlaces = PLACES.filter((place: Place) => place.city.name.toLowerCase() === action.payload.toLowerCase());
    },
    setSortedPlaces: (state, action: PayloadAction<Place[]>) => {
      state.sortedCityPlaces = [...action.payload];
    },

    setActivePointPlace: (state, action: PayloadAction<Place>) => {
      state.activePointPlace = action.payload;
    },
  },
});

export const { changeCity, setActiveCityPlaces, setActivePointPlace, setSortedPlaces } = appSlice.actions;
export default appSlice.reducer;
