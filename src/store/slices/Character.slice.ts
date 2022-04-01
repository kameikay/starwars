import { createSlice } from '@reduxjs/toolkit';

export interface ICharacterFavourite {
  id: string;
  name: string;
}

const characterSlice = createSlice({
  name: 'character',
  initialState: <ICharacterFavourite[]>[],
  reducers: {
    setFavouriteCharacter: (state, { payload }) => {
      const { name, id } = payload;

      const isFavouriteAlready = state.find(
        (character) => character.id === id && character.name === name,
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
    removeFavouriteCharacter: (state, { payload }) => {
      const { name, id } = payload;

      return state.filter(
        (character) => character.name !== name || character.id !== id,
      );
    },
  },
});

export const { setFavouriteCharacter, removeFavouriteCharacter } = characterSlice.actions;

export default characterSlice.reducer;
