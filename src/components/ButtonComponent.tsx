import { ReactNode } from 'react'
import { StyleProp, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'

//component
import { TextComponent } from './TextComponent'

//style
import { global } from '@/styles/global'

//constant
import { colors } from '../constants/colors'
import { fontFamilies } from '../constants/fonts'

interface Props {
  disabled?: boolean
  icon?: ReactNode
  text: string
  type?: 'primary' | 'text' | 'link'
  color?: string
  styles?: StyleProp<ViewStyle>
  textColor?: string
  textFont?: string
  textStyles?: StyleProp<TextStyle>
  onPress?: (data: any) => void
  iconFlex?: 'right' | 'left'
}

export const ButtonComponent = (props: Props) => {
  const { disabled, icon, text, textColor, textStyles, color, styles, type, textFont, onPress, iconFlex } = props

  return type === 'primary' ? (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[global.button, { backgroundColor: color ?? appColor.primary }, styles]}
    >
      {icon && iconFlex === 'left' && icon}
      <TextComponent
        text={text}
        color={textColor ?? appColor.white}
        styles={[textStyles, { marginLeft: icon ? 12 : 0 }]}
        font={appFont.medium}
        flex={icon && iconFlex === 'right' ? 1 : 0}
      />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextComponent text={text} color={type === 'link' ? appColor.primary : appColor.text} />
    </TouchableOpacity>
  )
}
