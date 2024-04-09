import {createSlice} from '@reduxjs/toolkit';

const initialUserState = {
  id: null,
  username: null,
  email: null,
  firstName: null,
  lastName: null,
  gender: null,
  image: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserData(state, action) {
      return {...state, ...action.payload};
    },
    clearUserData() {
      return initialUserState;
    },
  },
});

export const {setUserData, clearUserData} = userSlice.actions;

export default userSlice.reducer;
