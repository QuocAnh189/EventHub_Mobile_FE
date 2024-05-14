/* eslint-disable no-unused-vars */
// import {IUser} from '@interface/'

export enum Provider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}

export interface LoginPayload {
  identity: string
  password: string
}

export const InitLogin = {
  identity: '',
  password: '',
} as LoginPayload

export interface OAuthLoginPayload {
  email: string
  name?: string
  avatar?: string
  phoneNumber?: string
  provider: Provider
  tokenExpiredDate: Date
}

export interface SignUpPayload {
  email: string
  userName: string
  phoneNumber: string
  password: string
}

export const InitSignup = {
  email: '',
  userName: '',
  phoneNumber: '',
  password: '',
} as SignUpPayload

export interface SignUpPayloadOne {
  email: string
  userName: string
  phoneNumber: string
}

export const InitSignUpOne = {
  email: '',
  userName: '',
  phoneNumber: '',
} as SignUpPayloadOne

export interface SignUpPayloadTwo {
  password: string
}

export const InitSignUpTwo = {
  password: '',
} as SignUpPayloadTwo

export interface ForgotPassPayload {
  email: string
}

export interface LoginResponse {
  // user: User
  accessToken: string
  refreshToken: string
}
