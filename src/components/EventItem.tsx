import React from 'react'
import { ImageBackground } from 'react-native'

//navigation
import { useNavigation } from '@react-navigation/native'

//component
import { AvatarGroup } from './AvatarGroup'
import { CardComponent } from './CardComponent'
import { RowComponent } from './RowComponent'
import { SpaceComponent } from './SpaceComponent'
import { TextComponent } from './TextComponent'

//constant
import { global } from '@/styles/global'
import { appColor, appInfo, appFont } from '@/constants'

//interface
// import { EventModel } from '@/interfaces/eventModel';

//icons
import { Location } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface Props {
  item: any
  type: 'card' | 'list'
}

export const EventItem = (props: Props) => {
  const { item, type } = props

  const navigation: any = useNavigation()

  return (
    <CardComponent
      isShadow
      styles={{ width: appInfo.sizes.WIDTH * 0.7 }}
      onPress={() => navigation.navigate('EventDetail', { item })}
    >
      <ImageBackground
        style={{ flex: 1, marginBottom: 12, height: 131, padding: 10 }}
        source={require('@/assets/images/event-image.png')}
        imageStyle={{
          resizeMode: 'cover',
          borderRadius: 12,
        }}
      >
        <RowComponent justify="space-between">
          <CardComponent styles={[global.noSpaceCard]} color="#ffffffB3">
            <TextComponent color={appColor.danger2} font={appFont.bold} size={18} text="10" />
            <TextComponent color={appColor.danger2} font={appFont.semiBold} size={10} text="JUNE" />
          </CardComponent>
          <CardComponent styles={[global.noSpaceCard]} color="#ffffffB3">
            <MaterialIcons name="bookmark" color={appColor.danger2} size={22} />
          </CardComponent>
        </RowComponent>
      </ImageBackground>
      <TextComponent numOfLine={1} text={item.title} title size={18} />
      <AvatarGroup />
      <RowComponent>
        <Location size={18} color={appColor.text3} variant="Bold" />
        <SpaceComponent width={8} />
        <TextComponent flex={1} numOfLine={1} text={item.location.address} size={12} color={appColor.text2} />
      </RowComponent>
    </CardComponent>
  )
}
