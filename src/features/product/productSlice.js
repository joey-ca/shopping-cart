import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/phones';

const initialState = data;

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {}
});

export const { increment, decrement, incrementByAmount } = productSlice.actions;

export default productSlice.reducer;