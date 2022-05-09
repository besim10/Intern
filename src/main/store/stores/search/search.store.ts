import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const Search = createSlice({
  name: 'search',
  initialState: '' as string,
  reducers: {
    setSearch(_state, action: PayloadAction<string>) {
      return action.payload;
    }
  },
});

export default Search;

export const { setSearch } = Search.actions;
