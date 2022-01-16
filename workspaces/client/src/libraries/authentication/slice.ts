import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
  isTokenAuthenticated: false,
  isLoggingIn: false,
  isSigningUp: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    updateIsTokenAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isTokenAuthenticated = action.payload;
    },
    updateIsLoggingIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggingIn = action.payload;
    },
    updateIsSigningUp: (state, action: PayloadAction<boolean>) => {
      state.isSigningUp = action.payload;
    },
  },
});

export const { updateIsTokenAuthenticated, updateIsLoggingIn, updateIsSigningUp } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
