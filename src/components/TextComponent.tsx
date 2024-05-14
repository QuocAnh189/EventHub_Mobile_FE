import React from 'react'
import { Text, StyleProp, TextStyle, Platform } from 'react-native'

//constant
import { global } from '@/styles/global'
import { appColor, appFont } from '@/constants'

interface Props {
  text: string | number
  color?: string
  size?: number
  flex?: number
  font?: string
  styles?: StyleProp<TextStyle>
  title?: boolean
  numOfLine?: number
}

export const TextComponent = (props: Props) => {
  const { text, size, flex, font, color, styles, title, numOfLine } = props

  const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14

  return (
    <Text
      numberOfLines={numOfLine}
      style={[
        global.text,
        {
          color: color ?? appColor.text,
          flex: flex ?? 0,
          fontSize: size ? size : title ? 24 : fontSizeDefault,
          fontFamily: font ? font : title ? appFont.medium : appFont.regular,
        },
        styles,
      ]}
    >
      {text}
    </Text>
  )
}
