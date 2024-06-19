import { createSlice } from '@reduxjs/toolkit'

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: false,
  reducers: {
    setVisibleAction: (state, action) => action.payload,
  },
})

export const { setVisibleAction } = drawerSlice.actions

export default drawerSlice.reducer
