import { createSlice } from '@reduxjs/toolkit';

export interface IVehicleFavourite {
  id: string;
  name: string;
}

const vehicleSlice = createSlice({
  name: 'starships',
  initialState: <IVehicleFavourite[]>[],
  reducers: {
    setVehicleFavourite: (state, { payload }) => {
      const { name, id } = payload;

      const isFavouriteAlready = state.find(
        (film) => film.id === id && film.name === name,
      );

      if (isFavouriteAlready) {
        return state;
      }
      return [
        ...state,
        {
          name,
          id,
        },
      ];
    },
    removeFavouriteVehicle: (state, { payload }) => {
      const { name, id } = payload;

      return state.filter((film) => film.name !== name || film.id !== id);
    },
  },
});

export const { setVehicleFavourite, removeFavouriteVehicle } = vehicleSlice.actions;

export default vehicleSlice.reducer;
