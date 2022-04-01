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
  },
});

export const { setFavouriteCharacter } = characterSlice.actions;

export default characterSlice.reducer;
