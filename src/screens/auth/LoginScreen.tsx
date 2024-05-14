import React, { useEffect, useState } from 'react'
import { Image, Switch, View } from 'react-native'

//component
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components'
import SocialLogin from './components/SocialLogin'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

//constant
import { appColor, appFont } from '../../constants'

//icon
import AntDesign from 'react-native-vector-icons/AntDesign'

//type
import { InitSignIn, SignInType } from '../../types/auth'

//form
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

//modal
import { LoadingModal } from '../../modals'

//redux
import { useSignInMutation } from '../../redux/services/authApi'
import { signIn } from '../../redux/slices/authSlice'
import { useAppDispatch } from '../../redux/hook'
import { setUser } from '../../redux/slices/userSlice'
import { IAuth } from '@/interfaces/systems/auth'

const formSchema = z.object({
  identity: z.string().min(1, 'Bạn chưa nhập email'),
  password: z.string().min(1, 'Bạn chưa nhập mật khẩu'),
})

const InitErrorLogin = {
  email: false,
  password: false,
  disable: false,
}

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch()

  const [isRemember, setIsRemember] = useState<boolean>()
  const [formError, setFormError] = useState(InitErrorLogin)

  const [logIn, { isLoading }] = useSignInMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignInType>({
    resolver: zodResolver(formSchema),
    defaultValues: InitSignIn,
  })

  useEffect(() => {
    setFormError(InitErrorLogin)
  }, [watch().identity, watch().password])

  const onSubmit: SubmitHandler<SignInType> = async (data: any) => {
    try {
      const result: IAuth = await logIn(data).unwrap()
      if (result) {
        dispatch(signIn(result))

        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL!}/auth/profile`, {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        })

        const user = await response.json()
        dispatch(setUser(user.data))
      }
    } catch (error: any) {
      const message = error.message
      switch (message) {
        case 'Invalid credentials':
          Toast.show({
            type: 'error',
            text1: 'Login Failure',
            text2: 'Invalid credentials!',
            visibilityTime: 2500,
            topOffset: 60,
          })
          break
        default:
          break
      }
    }
  }

  return (
    <>
      <ContainerComponent isImageBackground isScroll>
        <SectionComponent
          styles={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Image
            source={require('../../assets/images/text-logo.png')}
            style={{
              width: 162,
              height: 114,
              marginBottom: 30,
            }}
          />
        </SectionComponent>
        <SectionComponent>
          <TextComponent size={24} title text="Sign in" />
          <SpaceComponent height={21} />
          <Controller
            name="identity"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                placeholder="Email or Username"
                onChange={onChange}
                allowClear
                affix={<AntDesign name="mail" size={20} color={appColor.gray} />}
              />
            )}
          />
          {errors?.identity && (
            <SectionComponent>
              <TextComponent text={errors?.identity.message!} color={appColor.danger} />
            </SectionComponent>
          )}
          {formError.email && (
            <SectionComponent>
              <TextComponent text="Email does not exits" color={appColor.danger} />
            </SectionComponent>
          )}
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
          {formError.password && (
            <SectionComponent>
              <TextComponent text="Wrong password" color={appColor.danger} />
            </SectionComponent>
          )}
          <RowComponent justify="space-between">
            <RowComponent onPress={() => setIsRemember(!isRemember)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Switch
                  trackColor={{ true: appColor.primary }}
                  thumbColor={appColor.white}
                  value={isRemember}
                  onChange={() => setIsRemember(!isRemember)}
                />
                <TextComponent text="Remember me" font={appFont.medium} color={appColor.gray} />
              </View>
            </RowComponent>
            <ButtonComponent
              text="Forgot Password?"
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
              type="text"
            />
          </RowComponent>
        </SectionComponent>
        <SpaceComponent height={16} />
        <SectionComponent>
          <ButtonComponent disabled={isLoading} onPress={handleSubmit(onSubmit)} text="SIGN IN" type="primary" />
        </SectionComponent>
        <SocialLogin />
        <SectionComponent>
          <RowComponent justify="center">
            <TextComponent text="Don’t have an account ? " />
            <ButtonComponent type="link" text="Sign up" onPress={() => navigation.navigate('SignUpScreen')} />
          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
      <LoadingModal visible={isLoading} />
      <Toast />
    </>
  )
}

export default LoginScreen
