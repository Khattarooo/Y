// authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserData {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface UserState {
  userData: UserData | null;
}

const initialState: UserState = {
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
    },
    logout(state) {
      state.userData = null;
    },
    register(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
    },
    login(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
    },
  },
});

export const {setUser, logout, register, login} = authSlice.actions;
export default authSlice.reducer;
