import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ProductState } from '../product/productSlice';

interface ShoppingCartState {
  uniqueItems: (ProductState | null)[];
  itemCount: (number | null)[];
}

const initialState: ShoppingCartState = {
  uniqueItems: [],
  itemCount: []
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductState>) => {
      const newItem = action.payload;
      const hasItem = state.uniqueItems.find(element => {
        if(element) {
          return element.id === newItem.id
        }
      });

      if (hasItem) {
        state.itemCount[newItem.id] = <number>state.itemCount[newItem.id] + 1;
      } else {
        state.uniqueItems[newItem.id] = newItem;
        state.itemCount[newItem.id] = 1;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.uniqueItems[action.payload] = null;
      state.itemCount[action.payload] = null;
    },
    plusItem: (state, action: PayloadAction<number>) => {
      state.itemCount[action.payload] = <number>state.itemCount[action.payload] + 1;      
    },
    minusItem: (state, action: PayloadAction<number>) => {
      state.itemCount[action.payload] = <number>state.itemCount[action.payload] - 1;      
      
      if (!state.itemCount[action.payload]) {
        state.uniqueItems[action.payload] = null;
        state.itemCount[action.payload] = null;
      }
    }
  }
});

export const { addItem, removeItem, plusItem, minusItem } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;






