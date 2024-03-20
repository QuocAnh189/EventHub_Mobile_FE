import React, { useState } from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'

//swiper
import Swiper from 'react-native-swiper'

//style
import { global } from '../../styles/global'

//component
import { TextComponent } from '../../components'

//constant
import { appColor, appInfo, appFont } from '../../constants'

const OnboardScreen = ({ navigation }: any) => {
  const [index, setIndex] = useState<number>(0)

  const handleSwiper = () => {
    if (index < 2) {
      setIndex(index + 1)
    } else {
      navigation.navigate('LoginScreen')
    }
  }

  return (
    <View style={[global.container]}>
      <Swiper
        style={{}}
        loop={false}
        onIndexChanged={num => setIndex(num)}
        index={index}
        activeDotColor={appColor.white}
      >
        <Image
          source={require('../../assets/images/onboarding-first.png')}
          style={{ flex: 1, width: appInfo.sizes.WIDTH, height: appInfo.sizes.HEIGHT }}
          resizeMode="cover"
        />
        <Image
          source={require('../../assets/images/onboarding-second.png')}
          style={{ flex: 1, width: appInfo.sizes.WIDTH, height: appInfo.sizes.HEIGHT }}
          resizeMode="cover"
        />
        <Image
          source={require('../../assets/images/onboarding-third.png')}
          style={{ flex: 1, width: appInfo.sizes.WIDTH, height: appInfo.sizes.HEIGHT }}
          resizeMode="cover"
        />
      </Swiper>
      <View
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: 60,
            position: 'absolute',
            bottom: 0,
            right: 10,
            left: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <TextComponent text="Skip" color={appColor.white} font={appFont.medium} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSwiper}>
          <TextComponent text="Next" color={appColor.white} font={appFont.medium} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OnboardScreen
