import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    loggedInUser: (state, action) => action.payload,
    logout: (state) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { loggedInUser, logout } = userSlice.actions;

export default userSlice.reducer;