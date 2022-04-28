import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '../../../interfaces/IProduct';

const Product = createSlice({
  name: 'product',
  initialState: null,
  reducers: {
    setProduct(_state, action: PayloadAction<IProduct>) {
      return action.payload;
    }
  },
});

export default Product;

export const { setProduct } = Product.actions;
