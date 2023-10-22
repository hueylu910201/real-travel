import { createSlice } from '@reduxjs/toolkit';

// Part1: Define Slice (including reducers and actions)
const initialState = { favItems: [] };
const favSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavItems: (state=initialState, action) => {
      const newItem = action.payload;
      const existingItem = state.favItems.find((item) => item.name === newItem.name);

      if (existingItem) {
        // If the item already exists, increase the quantity by 1
        const favItems = state.favItems.map((x) =>
            x.name === existingItem.name ? newItem : x
         );
         state.favItems = favItems;
      } else {
        // Otherwise, add a new item with qty 1
        state.favItems = [...state.favItems, newItem];
      }
      console.log("reducer");
    },
    removeFavItems: (state, action) => {
      state.favItems = state.favItems.filter((x) => x.name !== action.payload);
    },
  },
});

// export state to global
export const selectFavItems = (state) => state.favorite.favItems;

// export actions to global
export const { addFavItems, removeFavItems } = favSlice.actions;

// export reducer to global
export default favSlice.reducer;