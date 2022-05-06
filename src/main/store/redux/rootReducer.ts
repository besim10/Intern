import { combineReducers } from '@reduxjs/toolkit';
import userStore from '../stores/user/user.store';
import navigationStore from '../stores/navigation/navigation.store';
import Products from '../stores/products/products.store';
import Search from '../stores/search/search.store';
import Categories from '../stores/categories/store.categories';
import ShippingAddress from '../stores/shipping-info/shippindAddress.store';
import cart from '../stores/cart/cart.store';

const rootReducer = combineReducers({
  user: userStore.reducer,
  navigation: navigationStore.reducer,
  products: Products.reducer,
  cart:cart.reducer,
  shippingAddress: ShippingAddress.reducer,
  search: Search.reducer,
  categories: Categories.reducer

});

export default rootReducer;
