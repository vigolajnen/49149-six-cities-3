import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PLACES } from '../mocks/places';
import { Place } from '../types';

const initialState = {
  activeCity: 'Paris',
  activeCityPlaces: PLACES.filter((city: Place) => city.city.name === 'Amsterdam'),
  activePointPlace: {} as Place,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.activeCity = action.payload;
    },
    setActiveCityPlaces: (state, action: PayloadAction<string>) => {
      state.activeCityPlaces = PLACES.filter((city) => city.city.name === action.payload);
    },

    setActivePointPlace: (state, action: PayloadAction<Place>) => {
      state.activePointPlace = action.payload;
    },
  },
});

export const { changeCity, setActiveCityPlaces, setActivePointPlace } = appSlice.actions;
export default appSlice.reducer;
