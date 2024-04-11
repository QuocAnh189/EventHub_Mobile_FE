import React, { useState } from 'react'

//component
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components'

//constant
import { appColor } from '../../constants'

//icons
import AntDesign from 'react-native-vector-icons/AntDesign'

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('')

  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent text="Reset Password" title />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponent height={26} />
        <InputComponent
          value={email}
          onChange={val => setEmail(val)}
          affix={<AntDesign name="mail" size={20} color={appColor.gray} />}
          placeholder="abc@gmail.com"
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="Send"
          type="primary"
          icon={<AntDesign name="arrowright" size={20} color={appColor.white} />}
          iconFlex="right"
          onPress={() => {
            navigation.navigate('VerifyScreen')
          }}
        />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default ForgotPasswordScreen
