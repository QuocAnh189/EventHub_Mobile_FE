import React from 'react'
import { Image, ImageProps, StyleProp, TouchableOpacity, View } from 'react-native'

//component
import { TextComponent } from './TextComponent'

//constant
import { appColor, appFont } from '@/constants'

//style
import { global } from '@/styles/global'

interface Props {
  photoURL?: string
  name: string
  size?: number
  styles?: StyleProp<ImageProps>
  onPress?: () => void
}

export const AvatarComponent = (props: Props) => {
  const { photoURL, name, size, styles, onPress } = props

  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      {photoURL ? (
        <Image
          source={{ uri: photoURL }}
          style={[
            {
              width: size ?? 40,
              height: size ?? 40,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: appColor.white,
            },
            styles,
          ]}
        />
      ) : (
        <View
          style={[
            global.center,
            {
              width: size ?? 40,
              height: size ?? 40,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: appColor.white,
              backgroundColor: appColor.gray2,
            },
          ]}
        >
          <TextComponent
            text={name.substring(0, 1).toLocaleUpperCase()}
            font={appFont.bold}
            color={appColor.white}
            size={size ? size / 3 : 14}
          />
        </View>
      )}
    </TouchableOpacity>
  )
}
