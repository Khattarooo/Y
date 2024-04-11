import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {AuthState} from '../../utils/types';

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
    },
  },
});

export const {setAuthState, logout} = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
