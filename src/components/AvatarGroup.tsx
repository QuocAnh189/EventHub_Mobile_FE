import React from 'react'
import { Image } from 'react-native'

//component
import { RowComponent } from './RowComponent'
import { SpaceComponent } from './SpaceComponent'
import { TextComponent } from './TextComponent'

//constant
import { appColor, appFont } from '@/constants'

interface Props {
  size?: number
  userIds?: string[]
}

export const AvatarGroup = (props: Props) => {
  const { size, userIds } = props
  const photoUrl = 'https://gamek.mediacdn.vn/133514250583805952/2022/5/18/photo-1-16528608926331302726659.jpg'
  return (
    <RowComponent justify="flex-start" styles={{ marginVertical: 12 }}>
      {true &&
        Array.from({ length: 3 }).map((item, index) => (
          <Image
            key={`img${index}`}
            source={{ uri: photoUrl }}
            style={{
              width: size ?? 24,
              height: size ?? 24,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: appColor.white,
              marginLeft: index > 0 ? -8 : 0,
            }}
          />
        ))}
      <SpaceComponent width={12} />
      <TextComponent
        text="+20 Favorite"
        size={12 + (size ? (size - 24) / 5 : 0)}
        color={appColor.primary}
        font={appFont.semiBold}
      />
    </RowComponent>
  )
}
