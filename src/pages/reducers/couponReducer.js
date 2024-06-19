import { createSlice } from '@reduxjs/toolkit'

const couponSlice = createSlice({
  name: 'coupon',
  initialState: false,
  couponApplied: (state, action) => {
    // Use the current state to determine the new state
    if (state === false) {
      return action.payload;
    } else {
      // Return the current state if it's not false
      return state;
    }
  },
})

export const { couponApplied } = couponSlice.actions

export default couponSlice.reducer