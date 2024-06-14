import { createSlice } from '@reduxjs/toolkit'

let initialState = [];

// load cart items from local storage
if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    initialState = JSON.parse(localStorage.getItem("cart"));
  } else {
    initialState = [];
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => action.payload,
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer