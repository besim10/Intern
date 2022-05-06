import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IShippingAddress from '../../../interfaces/IShippingAddress';

const ShippingAddress = createSlice({
  name: 'shippingAddress',
  initialState: null as IShippingAddress,
  reducers: {
    setShippingAddress(_state, action: PayloadAction<IShippingAddress>) {
      return action.payload;
    }
  },
});

export default ShippingAddress;

export const { setShippingAddress } = ShippingAddress.actions;
