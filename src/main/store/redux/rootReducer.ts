import { combineReducers } from '@reduxjs/toolkit';
import userStore from '../stores/user/user.store';
import navigationStore from '../stores/navigation/navigation.store';
import Products from '../stores/products/products.store';


const rootReducer = combineReducers({
  user: userStore.reducer,
  navigation: navigationStore.reducer,
  products: Products.reducer
});

export default rootReducer;
