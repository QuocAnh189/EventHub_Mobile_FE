import { PayloadAction, createSlice } from '@reduxjs/toolkit'

//interfaces
import { IAuth } from '../../interfaces/systems/auth'
import { IUser } from '@/interfaces/systems/user'

export const AuthSliceKey = 'auth'

type InitialType = {
  authData: IAuth | undefined
  user: IUser | null
  isFirst: boolean
}

const initialState = {
  authData: undefined,
  user: null,
  // isFirst: false,
} as InitialType

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IAuth>) => {
      // state.isFirst = true
      state.authData = action.payload
    },

    signUp: (state, action: PayloadAction<IAuth>) => {
      state.authData = action.payload
    },

    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    },

    signOut: state => {
      // state.isFirst = true
      state.authData = undefined
    },
  },
})

export const { signUp, signIn, signOut, setUser } = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
