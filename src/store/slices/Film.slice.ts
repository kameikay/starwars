import { createSlice } from '@reduxjs/toolkit';

export interface IFilmsFavourite {
  id: string;
  title: string;
}

const filmSlice = createSlice({
  name: 'films',
  initialState: <IFilmsFavourite[]>[],
  reducers: {
    setFilmFavourite: (state, { payload }) => {
      const { title, id } = payload;

      const isFavouriteAlready = state.find(
        (film) => film.id === id && film.title === title,
      );

      if (isFavouriteAlready) {
        return state;
      }
      return [
        ...state,
        {
          title,
          id,
        },
      ];
    },
  },
});

export const { setFilmFavourite } = filmSlice.actions;

export default filmSlice.reducer;
