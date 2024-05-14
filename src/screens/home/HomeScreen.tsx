//hook
import React from 'react'

//component
import { FlatList, ImageBackground, Platform, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native'
import {
  CategoriesList,
  CircleComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from '../../components'

//constant
import { global } from '../../styles/global'
import { appColor, appFont } from '../../constants'

//redux
import { useAppDispatch, useAppSelector } from '@/redux/hook'

//icons
import { HambergerMenu, Notification, SearchNormal1, Sort } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useGetEventsQuery } from '@/redux/services/eventApi'
import { EEventStatus } from '../../constants'

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch()

  const { data: events } = useGetEventsQuery({ takeAll: false, type: EEventStatus.UPCOMING, size: 6 })

  const itemEvent = {
    title: 'International Band Music Concert',
    description:
      'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
    location: {
      title: 'Gala Convention Center',
      address: '36 Guild Street London, UK',
    },
    imageUrl: '',
    users: [''],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  }

  return (
    <View style={[global.container]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColor.primary,
          height: Platform.OS === 'android' ? 166 : 182,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        }}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColor.white} />
            </TouchableOpacity>
            <View style={[{ flex: 1, alignItems: 'center' }]}>
              <RowComponent>
                <TextComponent text="Current Location" color={appColor.white2} size={12} />
                <MaterialIcons name="arrow-drop-down" size={18} color={appColor.white} />
              </RowComponent>
              {true && (
                <TextComponent text="UIT, VietNam" flex={0} color={appColor.white} font={appFont.medium} size={16} />
              )}
            </View>

            <CircleComponent color="#524CE0" size={36}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('NotificationScreen')
                }}
              >
                <Notification size={18} color={appColor.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: -2,
                    right: -2,
                  }}
                />
              </TouchableOpacity>
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={20} />
          <RowComponent>
            <RowComponent
              styles={{ flex: 1 }}
              onPress={() =>
                navigation.navigate('SearchEventsScreen', {
                  isFilter: false,
                })
              }
            >
              <SearchNormal1 variant="TwoTone" color={appColor.white} size={20} />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColor.gray2,
                  marginHorizontal: 10,
                  height: 20,
                }}
              />
              <TextComponent flex={1} text="Search..." color={appColor.gray2} size={16} />
            </RowComponent>
            <TagComponent
              bgColor={'#5D56F3'}
              onPress={() =>
                navigation.navigate('SearchEventsScreen', {
                  isFilter: true,
                })
              }
              label="Filters"
            />
          </RowComponent>
          <SpaceComponent height={20} />
        </View>
        <View style={{ marginBottom: -16 }}>
          <CategoriesList isFill={true} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 22 : 18,
          },
        ]}
      >
        <SectionComponent styles={{ paddingHorizontal: 0, paddingTop: 24 }}>
          <TabBarComponent title="Best Events For You" onPress={() => navigation.navigate('ExploreEventsScreen')} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={events?.items}
            renderItem={({ item, index }) => <EventItem key={`event-${index}`} event={item} type="card" />}
          />
        </SectionComponent>
        <SectionComponent>
          <ImageBackground
            source={require('../../assets/images/invite-image.png')}
            style={{ flex: 1, padding: 16, minHeight: 127 }}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
            }}
          >
            <TextComponent text="Invite your friends" title />
            <TextComponent text="Get $20 for ticket" />

            <RowComponent justify="flex-start">
              <TouchableOpacity
                style={[
                  global.button,
                  {
                    marginTop: 12,
                    backgroundColor: '#00F8FF',
                    paddingHorizontal: 28,
                  },
                ]}
              >
                <TextComponent text="INVITE" font={appFont.bold} color={appColor.white} />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>
        <SectionComponent styles={{ paddingHorizontal: 0, paddingTop: 24 }}>
          <TabBarComponent title="Upcoming Events" onPress={() => {}} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={events?.items}
            renderItem={({ item, index }) => <EventItem key={`event-${index}`} event={item} type="card" />}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  )
}

export default HomeScreen
