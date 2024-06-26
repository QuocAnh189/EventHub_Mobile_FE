import React, { ReactNode } from 'react'
import { StyleProp, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'

//component
import { TextComponent } from './TextComponent'

//constant
import { global } from '@/styles/global'
import { appColor, appFont } from '@/constants'
import { Image } from 'react-native'

interface Props {
  onPress: () => void
  label: string
  icon?: any
  textColor?: string
  bgColor?: string
  styles?: StyleProp<ViewStyle>
  textStyles?: StyleProp<TextStyle>
}

export const TagComponent = (props: Props) => {
  const { onPress, label, icon, textColor, bgColor, styles } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        global.row,
        global.tag,
        {
          backgroundColor: bgColor ? bgColor : appColor.white,
        },
        styles,
      ]}
    >
      {icon ? <Image source={{ uri: icon }} width={10} height={10} /> : <></>}
      <TextComponent
        font={appFont.medium}
        text={label}
        styles={{ marginLeft: icon ? 8 : 0 }}
        color={textColor ? textColor : bgColor ? appColor.white : appColor.gray}
      />
    </TouchableOpacity>
  )
}
