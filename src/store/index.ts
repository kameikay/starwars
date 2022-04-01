import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/Character.slice';
import filmReducer from './slices/Film.slice';
import starshipReducer from './slices/Starship.slice';
import vehicleReducer from './slices/Vehicle.slice';

const store = configureStore({
  reducer: {
    character: characterReducer,
    film: filmReducer,
    starship: starshipReducer,
    vehicle: vehicleReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
