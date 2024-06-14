import { createSlice } from '@reduxjs/toolkit'

const codSlice = createSlice({
  name: 'cod',
  initialState: false,
  reducers: {
    setCOD: (state, action) => action.payload,
  },
})

export const { setCOD } = codSlice.actions

export default codSlice.reducer