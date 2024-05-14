import React, { useEffect, useState } from 'react'

//component
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '@/components'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

//modal
import { LoadingModal } from '@/modals'

//constant
import { appColor, PASSWORD_REGEX } from '@/constants'

//storage
import AsyncStorage from '@react-native-async-storage/async-storage'

//icons
import AntDesign from 'react-native-vector-icons/AntDesign'

//form
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

//type
import { InitSignUp, SignUpType } from '../../types/auth'

//redux
import { useSignUpMutation } from '../../redux/services/authApi'
import { useAppDispatch } from '@/redux/hook'
import { setUser } from '@/redux/slices/userSlice'

const formSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Họ tên không được để trống')
      .min(5, { message: 'Tên phải có ít nhất 5 kí tự' })
      .max(30, { message: 'Tên không được vượt quá 30 kí tự' }),
    email: z
      .string()
      .min(1, { message: 'Email không được để trống' })
      .max(30, { message: 'Email không được vượt quá 30 kí tự' })
      .email('Email không hợp lệ'),
    phoneNumber: z
      .string()
      .min(1, { message: 'Phone không được để trống' })
      .max(30, { message: 'Phone không được vượt quá 30 kí tự' }),
    password: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 kí tự' })
      .max(32, { message: 'Mật khẩu không được vượt quá 32 kí tự' })
      .regex(PASSWORD_REGEX.lowerCase, 'Mật khẩu phải có ít nhất 1 chữ cái in thường')
      .regex(PASSWORD_REGEX.upperCase, 'Mật khẩu phải có ít nhất 1 chữ cái in hoa')
      .regex(PASSWORD_REGEX.number, 'Mật khẩu phải có ít nhất 1 chữ số')
      .regex(PASSWORD_REGEX.specialCharacter, 'Mật khẩu phải có ít nhất 1 kí tự đặc biệt'),
    confirmpassword: z.string().min(1, { message: 'Email không được để trống' }),
  })
  .superRefine(({ confirmpassword, password }, ctx) => {
    if (confirmpassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không trùng khớp',
      })
    }
  })

const InitErrorRegister = {
  email: false,
  fullname: false,
  confirmpassword: false,
}

const SignUpScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch()

  const [formError, setFormError] = useState(InitErrorRegister)

  const [signUp, { isLoading }] = useSignUpMutation()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignUpType>({
    resolver: zodResolver(formSchema),
    defaultValues: InitSignUp,
  })

  useEffect(() => {
    setFormError(InitErrorRegister)
  }, [watch().email, watch().fullName, watch().password, watch().confirmpassword])

  const onSubmit: SubmitHandler<SignUpType> = async (data: any) => {
    try {
      const result: any = await signUp(data).unwrap()

      if (result) {
        Toast.show({
          type: 'success',
          text1: 'Register',
          text2: 'Resister Successfully !',
          visibilityTime: 2500,
          topOffset: 60,
        })
        dispatch(signUp(result))
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL!}/auth/profile`, {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        })
        const user = await response.json()
        dispatch(setUser(user.data))
      }
    } catch (error: any) {
      console.log(error)
      const message = error.message
      switch (message) {
        case 'Email already exists':
          setFormError(() => {
            var newError = { ...InitErrorRegister, email: true }
            return newError
          })
          break
        case 'Phone number already exists':
          setFormError(() => {
            var newError = { ...InitErrorRegister, fullname: true }
            return newError
          })
          break
        default:
          break
      }
    }
  }

  return (
    <>
      <ContainerComponent isImageBackground isScroll back>
        <SectionComponent>
          <TextComponent size={24} title text="Sign up" />
          <SpaceComponent height={21} />
          <Controller
            name="fullName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                placeholder="Full name"
                onChange={onChange}
                allowClear
                affix={<AntDesign name="user" size={20} color={appColor.gray} />}
              />
            )}
          />
          {errors?.fullName && (
            <SectionComponent>
              <TextComponent text={errors?.fullName.message!} color={appColor.danger} />
            </SectionComponent>
          )}
          {formError.fullname && (
            <SectionComponent>
              <TextComponent text="Name already exists" color={appColor.danger} />
            </SectionComponent>
          )}
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                placeholder="Email"
                onChange={onChange}
                allowClear
                affix={<AntDesign name="mail" size={20} color={appColor.gray} />}
              />
            )}
          />
          {errors?.email && (
            <SectionComponent>
              <TextComponent text={errors?.email.message!} color={appColor.danger} />
            </SectionComponent>
          )}
          {formError.email && (
            <SectionComponent>
              <TextComponent text="Email already exists" color={appColor.danger} />
            </SectionComponent>
          )}

          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                placeholder="Phone Number"
                onChange={onChange}
                allowClear
                affix={<AntDesign name="phone" size={20} color={appColor.gray} />}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                isPassword={true}
                value={value}
                placeholder="Password"
                onChange={onChange}
                allowClear
                affix={<AntDesign name="lock" size={20} color={appColor.gray} />}
              />
            )}
          />
          {errors?.password && (
            <SectionComponent>
              <TextComponent text={errors?.password.message!} color={appColor.danger} />
            </SectionComponent>
          )}
          <Controller
            name="confirmpassword"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                isPassword={true}
                value={value}
                placeholder="Confirm Password"
                onChange={onChange}
                allowClear
                affix={<AntDesign name="lock" size={20} color={appColor.gray} />}
              />
            )}
          />
          {errors?.confirmpassword && (
            <SectionComponent>
              <TextComponent text={errors?.confirmpassword.message!} color={appColor.danger} />
            </SectionComponent>
          )}
          {formError.confirmpassword && (
            <SectionComponent>
              <TextComponent text="Confirmpassword not match" color={appColor.danger} />
            </SectionComponent>
          )}
        </SectionComponent>

        <SpaceComponent height={16} />
        <SectionComponent>
          <ButtonComponent
            color={isValid ? appColor.primary : appColor.gray}
            onPress={handleSubmit(onSubmit)}
            text="SIGN UP"
            type="primary"
          />
        </SectionComponent>
        <SectionComponent>
          <RowComponent justify="center">
            <TextComponent text="Don’t have an account? " />
            <ButtonComponent type="link" text="Sign in" onPress={() => navigation.navigate('LoginScreen')} />
          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
      <LoadingModal visible={isLoading} />
      <Toast />
    </>
  )
}

export default SignUpScreen
