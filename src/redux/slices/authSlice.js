import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: null,
  isLoggedin: false,
};
const authSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isLoggedin = true; 
    },
    logout(state) {
      state.user = null;
      state.isLoggedin = false; // corrected spelling
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
