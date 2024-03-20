import React from 'react'
import { ImageBackground, Image, ActivityIndicator } from 'react-native'

//component
import { SpaceComponent } from '../components'

//constant
import { appColor, appInfo } from '../constants'

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/splash-image.png')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      imageStyle={{ flex: 1 }}
    >
      <Image
        source={require('../assets/images/logo.png')}
        style={{ width: appInfo.sizes.WIDTH * 0.8 }}
        resizeMode="contain"
      />
      <SpaceComponent height={20} />
      <ActivityIndicator color={appColor.gray} size={22} />
    </ImageBackground>
  )
}

export default SplashScreen
