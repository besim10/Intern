import { configureStore, current } from '@reduxjs/toolkit';
import IUser from '../../interfaces/IUser';
import { setUser } from '../stores/user/user.store';
import { setProducts } from '../stores/products/products.store';
import rootReducer from './rootReducer';
import IProduct from '../../interfaces/IProduct';
import axios from 'axios';
import ICategory from '../../interfaces/ICategory';

const initStore = async (currentUser:IUser) => {
  const appStore = configureStore({
    reducer: rootReducer,
  });
  const products: IProduct[] = await (
    await axios.get("product/get-all?PageNumber=1&PageSize=20")
  ).data.data;
  appStore.dispatch(setProducts(products));
  if(currentUser){
    appStore.dispatch(setUser(currentUser));
  }
  return appStore;
};

export default initStore;
