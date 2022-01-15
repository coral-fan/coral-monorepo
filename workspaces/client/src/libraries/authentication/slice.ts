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
    setIsTokenAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isTokenAuthenticated = action.payload;
    },
    setIsLoggingIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggingIn = action.payload;
    },
    setIsSigningUp: (state, action: PayloadAction<boolean>) => {
      state.isSigningUp = action.payload;
    },
  },
});

export const { setIsTokenAuthenticated, setIsLoggingIn, setIsSigningUp } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
