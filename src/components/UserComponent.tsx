import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native'

//component
import { RowComponent } from './RowComponent'
import { TextComponent } from './TextComponent'
import { SpaceComponent } from './SpaceComponent'

//constant
import { appColor, appFont } from '@/constants'

interface Props {
  userId: string
  type: 'Notification' | 'Invite'
  onPress: () => void
}

export const UserComponent = (props: Props) => {
  const { userId, type, onPress } = props
  const [profile, setProfile] = useState()

  useEffect(() => {
    getProfile()
  }, [userId])

  const getProfile = async () => {}

  return (
    profile && (
      <RowComponent onPress={onPress}>
        <Image
          source={{
            uri: 'https://img.icons8.com/cute-clipart/64/user-male-circle.png',
          }}
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            resizeMode: 'cover',
          }}
        />
        <SpaceComponent width={16} />
        <View
          style={{
            flex: 1,
            height: 48,
            justifyContent: 'space-around',
          }}
        >
          <TextComponent text="anhquoc18092003@gmail.com" font={appFont.medium} size={16} />
          <TextComponent text="Personal" color={appColor.gray} />
        </View>
      </RowComponent>
    )
  )
}
