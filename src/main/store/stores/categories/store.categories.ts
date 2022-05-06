import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICategory from '../../../interfaces/ICategory';

const Categories = createSlice({
  name: 'categories',
  initialState: null,
  reducers: {
    setCategories(_state, action: PayloadAction<ICategory[]>) {
      return action.payload;
    }
  },
});

export default Categories;

export const {setCategories } = Categories.actions;
