import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/Character.slice';
import filmReducer from './slices/Film.slice';
import starshipReducer from './slices/Starship.slice';

const store = configureStore({
  reducer: {
    character: characterReducer,
    film: filmReducer,
    starship: starshipReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
