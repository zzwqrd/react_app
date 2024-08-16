import { createSlice } from '@reduxjs/toolkit';

export const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    value: 0,
  },
  reducers: {
    updateProgress: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateProgress } = progressSlice.actions;

export default progressSlice.reducer;
