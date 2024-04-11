import React, { ReactNode } from 'react'
import { View, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'

//style
import { global } from '@/styles/global'

//navigation
import { useNavigation } from '@react-navigation/native'

//component
import { RowComponent } from './RowComponent'
import { TextComponent } from './TextComponent'

//icons
import AntDesign from 'react-native-vector-icons/AntDesign'

//constant
import { appColor, appFont } from '@/constants'

interface Props {
  isImageBackground?: boolean
  isScroll?: boolean
  title?: string
  children: ReactNode
  back?: boolean
  right?: ReactNode
}

export const ContainerComponent = (props: Props) => {
  const { children, isScroll, isImageBackground, title, back } = props

  const navigation: any = useNavigation()

  const headerComponent = () => {
    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        {(title || back) && (
          <RowComponent
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minWidth: 48,
              minHeight: 48,
            }}
          >
            {back && (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
                <AntDesign name="arrowleft" size={22} color={appColor.text} />
              </TouchableOpacity>
            )}
            {title ? <TextComponent text={title} size={24} font={appFont.medium} flex={1} /> : <></>}
          </RowComponent>
        )}
        {returnContainer}
      </View>
    )
  }

  const returnContainer = true ? (
    <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{children}</View>
  )

  return true ? (
    <ImageBackground source={require('@/assets/images/splash-image.png')} style={{ flex: 1 }} imageStyle={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[global.container]}>
      <View>{headerComponent()}</View>
    </SafeAreaView>
  )
}
