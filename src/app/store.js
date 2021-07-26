import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import shoppingCartReducer from '../features/shopping-cart/shoppingCartSlice';

export default configureStore({
  reducer: {
    product: productReducer,
    shoppingCart: shoppingCartReducer
  }
});
