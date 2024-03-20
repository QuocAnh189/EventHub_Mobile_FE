import React from 'react'
import { Image } from 'react-native'

//component
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'

//constant
import { appColor, appFont } from '../../../constants'

const SocialLogin = () => {
  return (
    <SectionComponent>
      <TextComponent
        styles={{ textAlign: 'center' }}
        text="OR"
        color={appColor.gray4}
        size={16}
        font={appFont.medium}
      />
      <SpaceComponent height={16} />
      <ButtonComponent
        type="primary"
        color={appColor.white}
        textColor={appColor.text}
        text="Login with Google"
        textFont={appFont.regular}
        iconFlex="left"
        icon={<Image style={{ width: 30, height: 30 }} source={require('../../../assets/images/google.png')} />}
      />
      <SpaceComponent height={16} />
      <ButtonComponent
        type="primary"
        color={appColor.white}
        textColor={appColor.text}
        text="Login with Facebook"
        textFont={appFont.regular}
        iconFlex="left"
        icon={<Image style={{ width: 30, height: 30 }} source={require('../../../assets/images/facebook.png')} />}
      />
    </SectionComponent>
  )
}

export default SocialLogin
