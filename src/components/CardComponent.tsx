import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle, TouchableOpacity } from 'react-native'

//constant
import { appColor } from '@/constants'
import { global } from '@/styles/global'

interface Props {
  onPress?: () => void
  children: ReactNode
  styles?: StyleProp<ViewStyle>
  isShadow?: boolean
  color?: string
}

export const CardComponent = (props: Props) => {
  const { onPress, children, styles, isShadow, color } = props

  const localStyles: StyleProp<ViewStyle>[] = [
    global.card,
    isShadow ? global.shadow : undefined,
    { backgroundColor: color ?? appColor.white },
    styles,
  ]

  return (
    <TouchableOpacity style={localStyles} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}
