import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import shoppingCartReducer from '../features/shopping-cart/shoppingCartSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    shoppingCart: shoppingCartReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;