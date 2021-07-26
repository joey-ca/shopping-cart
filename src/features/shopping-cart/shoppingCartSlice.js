import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uniqueItems: [],
  itemCount: []
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const hasItem = state.uniqueItems.find(element => {
        if(element) {
          return element.id === newItem.id
        }
      });

      if (hasItem) {
        state.itemCount[newItem.id]++;
      } else {
        state.uniqueItems[newItem.id] = newItem;
        state.itemCount[newItem.id] = 1;
      }
    },
    removeItem: (state, action) => {
      state.uniqueItems[action.payload] = null;
      state.itemCount[action.payload] = null;
    },
    plusItem: (state, action) => {
      state.itemCount[action.payload]++;
    },
    minusItem: (state, action) => {
      state.itemCount[action.payload]--;
      if (!state.itemCount[action.payload]) {
        state.uniqueItems[action.payload] = null;
        state.itemCount[action.payload] = null;
      }
    }
  }
});

export const { addItem, removeItem, plusItem, minusItem } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;






