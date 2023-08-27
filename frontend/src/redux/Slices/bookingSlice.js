import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem("cartItems");
const initialState = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    items: initialState,
    
  },
  reducers: {
    add: (state, action) => {
      const newItem = action.payload;
      const updatedItems = [...state.items, newItem];
      const updatedState = {
        ...state,
        items: updatedItems,
      };
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedState;
    },
    remove: (state, action) => {
      const itemId = action.payload;
      const index = state.items.findIndex(item => item._id === itemId);
      if (index !== -1) {
        const removedItem = state.items[index];
        const updatedItems = [
          ...state.items.slice(0, index),
          ...state.items.slice(index + 1),
        ];
        
        const updatedState = {
          ...state,
          items: updatedItems,
        };
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedState;
      }
      return state;
    },
  },
});

export const { add, remove } = bookingSlice.actions;