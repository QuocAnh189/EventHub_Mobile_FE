export type SignInType = {
  identity: string
  password: string
}

export const InitSignIn = {
  identity: '',
  password: '',
} as SignInType

export type SignUpType = {
  email: string
  fullName: string
  phoneNumber: string
  password: string
  confirmpassword: string
}

export const InitSignUp = {
  email: '',
  fullName: '',
  phoneNumber: '',
  password: '',
  confirmpassword: '',
} as SignUpType
