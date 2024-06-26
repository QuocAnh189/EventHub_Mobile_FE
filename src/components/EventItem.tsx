import React from 'react'
import { ImageBackground, StyleProp, ViewStyle, View, Image } from 'react-native'

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
import { IEvent } from '@/interfaces/contents/event'

//util
import dayjs from 'dayjs'

interface Props {
  event: IEvent
  type: 'card' | 'list'
  styles?: StyleProp<ViewStyle>
}

export const EventItem = (props: Props) => {
  const { event, type, styles } = props

  const navigation: any = useNavigation()

  return (
    <CardComponent
      isShadow
      styles={[{ width: appInfo.sizes.WIDTH * 0.7 }, styles]}
      onPress={() => navigation.navigate('EventDetailScreen', { id: event.id })}
    >
      {type === 'card' ? (
        <>
          <ImageBackground
            style={{ flex: 1, marginBottom: 12, height: 130, padding: 10 }}
            source={{ uri: event?.coverImage }}
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
          <TextComponent numOfLine={1} text={event.name} title size={18} />
          <AvatarGroup />
          <RowComponent>
            <Location size={18} color={appColor.text3} variant="Bold" />
            <SpaceComponent width={8} />
            <TextComponent flex={1} numOfLine={1} text={event.location} size={12} color={appColor.text2} />
          </RowComponent>
        </>
      ) : (
        <>
          <RowComponent>
            <Image
              source={{ uri: event.coverImage }}
              style={{
                width: 100,
                height: 92,
                borderRadius: 12,
                resizeMode: 'cover',
              }}
            />
            <SpaceComponent width={12} />
            <View
              style={{
                flex: 1,
                alignItems: 'stretch',
                gap: 4,
              }}
            >
              <TextComponent
                color={appColor.primary}
                text={dayjs(event.startTime).format('DD/MM/YYYY hh:mm A').toString()}
              />
              <TextComponent text={event.name} title size={18} numOfLine={2} />
              <RowComponent>
                <Location size={18} color={appColor.text3} variant="Bold" />
                <SpaceComponent width={8} />
                <TextComponent flex={1} numOfLine={1} text={event.location} size={12} color={appColor.text2} />
              </RowComponent>
            </View>
          </RowComponent>
        </>
      )}
    </CardComponent>
  )
}
