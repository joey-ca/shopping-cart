import { createSlice } from '@reduxjs/toolkit';
import data from '../../data/phones';

export type ProductState = {
  title: string;
  category: string;
  images: string[];
  brand: string;
  price: number;
  cpu: string;
  camera: string;
  size: string;
  weight: string;
  display: string;
  battery: string;
  memory: string;
  id: number;
  description: string;
};

const initialState: ProductState[] = data;

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {}
});

// export const { increment, decrement, incrementByAmount } = productSlice.actions;

export default productSlice.reducer;