import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthenticationState {
  isTokenAuthenticated: boolean;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
}

export const initialState: AuthenticationState = {
  isTokenAuthenticated: false,
  isAuthenticated: false,
  isLoggingIn: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setIsTokenAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isTokenAuthenticated = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setIsLoggingIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggingIn = action.payload;
    },
  },
});

export const { setIsTokenAuthenticated, setIsAuthenticated, setIsLoggingIn } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
