export type SignInType = {
  email: string;
  password: string;
};

export const InitSignIn = {
  email: '',
  password: '',
} as SignInType;

export type SignUpType = {
  email: string;
  fullname: string;
  password: string;
  confirmpassword: string;
};

export const InitSignUp = {
  email: '',
  fullname: '',
  password: '',
  confirmpassword: '',
} as SignUpType;
