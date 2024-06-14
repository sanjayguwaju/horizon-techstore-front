import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    loggedInUser: (state, action) => action.payload,
    logout: (state, action) => action.payload,
  },
});

export const { loggedInUser, logout } = userSlice.actions;

export default userSlice.reducer;