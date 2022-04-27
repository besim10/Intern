import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '../../../interfaces/IProduct';

const Products = createSlice({
  name: 'products',
  initialState: null,
  reducers: {
    setProducts(_state, action: PayloadAction<IProduct[]>) {
      return action.payload;
    }
  },
});

export default Products;

export const { setProducts } = Products.actions;
