import { PayloadAction, createSlice } from '@reduxjs/toolkit';

//interfaces
import { IAuth } from '../../interfaces';

//storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthSliceKey = 'auth';

type InitialType = {
  authData: IAuth | undefined;
  isFirst: boolean;
};

const initialState = {
  authData: undefined,
  isFirst: false,
} as InitialType;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IAuth>) => {
      state.isFirst = true;
      state.authData = action.payload;
    },

    signUp: (state, action: PayloadAction<IAuth>) => {
      state.authData = action.payload;
    },

    signOut: state => {
      state.isFirst = true;
      state.authData = undefined;
    },
  },
});

export const { signUp, signIn, signOut } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
