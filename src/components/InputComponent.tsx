import React, { ReactNode, useState } from 'react'
import { View, TouchableOpacity, TextInput, KeyboardType, StyleProp, ViewStyle } from 'react-native'

//constant
import { global } from '@/styles/global'
import { appColor } from '@/constants'

//icons
import { Global } from 'iconsax-react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { EyeSlash } from 'iconsax-react-native'

interface Props {
  value: string
  onChange: (val: string) => void
  affix?: ReactNode
  placeholder?: string
  suffix?: ReactNode
  isPassword?: boolean
  allowClear?: boolean
  type?: KeyboardType
  onEnd?: () => void
  multiline?: boolean
  numberOfLine?: number

  styles?: StyleProp<ViewStyle>
}

export const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    suffix,
    placeholder,
    isPassword,
    allowClear,
    type,
    onEnd,
    multiline,
    numberOfLine,
    styles,
  } = props

  const [isShowPass, setIsShowPass] = useState(isPassword ?? false)

  return (
    <View
      style={[
        global.inputContainer,
        {
          alignItems: multiline ? 'flex-start' : 'center',
        },
        styles,
      ]}
    >
      {affix ?? affix}
      <TextInput
        style={[
          global.input,
          global.text,
          {
            paddingHorizontal: affix || suffix ? 12 : 0,
          },
        ]}
        multiline={multiline}
        value={value}
        numberOfLines={numberOfLine}
        placeholder={placeholder ?? ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPass}
        placeholderTextColor={'#747688'}
        keyboardType={type ?? 'default'}
        autoCapitalize="none"
        onEndEditing={onEnd}
      />
      {suffix ?? suffix}
      <TouchableOpacity onPress={isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')}>
        {isPassword ? (
          <FontAwesome name={isShowPass ? 'eye-slash' : 'eye'} size={22} color={appColor.gray} />
        ) : (
          value.length > 0 && allowClear && <AntDesign name="close" size={22} color={appColor.text} />
        )}
      </TouchableOpacity>
    </View>
  )
}
