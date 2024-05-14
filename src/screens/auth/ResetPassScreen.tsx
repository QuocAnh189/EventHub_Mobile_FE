import React, { useState } from 'react'

//component
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '@/components'

//constant
import { appColor } from '@/constants'

//icons
import AntDesign from 'react-native-vector-icons/AntDesign'

const ResetPassScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('')

  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent text="Change Password" title />
        <TextComponent text="Please enter your new password and confirm password to request a password change" />
        <SpaceComponent height={26} />
        <InputComponent
          isPassword={true}
          value=""
          placeholder="Password"
          onChange={() => {}}
          allowClear
          affix={<AntDesign name="lock" size={20} color={appColor.gray} />}
        />
        <InputComponent
          isPassword={true}
          value=""
          placeholder="Password"
          onChange={() => {}}
          allowClear
          affix={<AntDesign name="lock" size={20} color={appColor.gray} />}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="Submit"
          type="primary"
          icon={<AntDesign name="arrowright" size={20} color={appColor.white} />}
          iconFlex="right"
          // onPress={() => {
          //   navigation.navigate('VerifyScreen');
          // }}
        />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default ResetPassScreen
