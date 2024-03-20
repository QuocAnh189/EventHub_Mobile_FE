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

//constant
import { appColor, appFont } from '../../constants'

//interface
// import { IAuth } from '../../interfaces';

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
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useAppDispatch } from '../../redux/hook'
import { signIn } from '../../redux/slices/authSlice'

const formSchema = z.object({
  email: z.string().min(1, 'Bạn chưa nhập email'),
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
  const [isShowPass, setIsShowPass] = useState(true)
  const [formError, setFormError] = useState(InitErrorLogin)

  const [SignIn, { isLoading }] = useSignInMutation()
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
  }, [watch().email, watch().password])

  const onSubmit: SubmitHandler<SignInType> = async data => {
    const mockData: any = {
      user: { image: '', fullname: 'haha', email: 'anhquoc18092003@gmailcom' },
      accessToken: '123',
      refreshToken: '123',
    }
    dispatch(signIn(mockData))
    // await SignIn(data)
    //   .unwrap()
    //   .then(res => {
    //     dispatch(signIn(res));
    //   })
    //   .catch((e: FetchBaseQueryError) => {
    //     const { message }: any = e.data;
    //     switch (message) {
    //       case 'This email was not found':
    //         setFormError(() => {
    //           var newError = { ...InitErrorLogin, email: true };
    //           return newError;
    //         });
    //         break;
    //       case 'Password not matching':
    //         setFormError(() => {
    //           var newError = { ...InitErrorLogin, password: true };
    //           return newError;
    //         });
    //         break;
    //       case 'This user was disabled':
    //         setFormError(() => {
    //           var newError = { ...InitErrorLogin, authAccount: true };
    //           return newError;
    //         });
    //         break;
    //       default:
    //         break;
    //     }
    //   });
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
                // isShowPass={isShowPass!}
                // setIsShowPass={setIsShowPass}
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
    </>
  )
}

export default LoginScreen
