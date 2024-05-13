import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ImageBackground, Platform, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native'

//component
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

// import GeoLocation from '@react-native-community/geolocation';

//constant
import { global } from '../../styles/global'
import { appColor, appFont } from '../../constants'

//interface
// import { AddressModel } from '../../interfaces';

//redux
import { useDispatch, useSelector } from 'react-redux'

//icons
import { HambergerMenu, Notification, SearchNormal1, Sort } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { API } from '../../constants/api'
import { Conversation, Message } from '../../interfaces/websockets'
import { JoinChatRoomRequest, SendMessageRequest } from '../../types/conversation'

const HomeScreen = ({ navigation }: any) => {
  const [currentLocation, setCurrentLocation] = useState()

  const [conversation, setConversation] = useState<Conversation>()
  const [messages, setMessages] = useState<Message[]>([])
  const [connection, setConnection] = useState<HubConnection>()

  const joinChatRoom = useRef<(() => Promise<void>) | null>(null)

  const dispatch = useDispatch()

  // const auth = useSelector(authSelector);

  useEffect(() => {
    // GeoLocation.getCurrentPosition(
    //   position => {
    //     if (position.coords) {
    //       reverseGeoCode({
    //         lat: position.coords.latitude,
    //         long: position.coords.longitude,
    //       });
    //     }
    //   },
    //   () => {},
    //   () => {},
    // );
  }, [])

  const reverseGeoCode = async ({ lat, long }: { lat: number; long: number }) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apiKey=zCDIlA5ytRuEe3YS9YrJlzAGjTkxsy4S6mJtq7ZpkGU`

    // try {
    //   const res = await axios(api);

    //   if (res && res.status === 200 && res.data) {
    //     const items = res.data.items;
    //     setCurrentLocation(items[0]);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

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
  useEffect(() => {
    joinChatRoom.current = async () => {
      try {
        const conn = new HubConnectionBuilder()
          .withUrl(`${API}/chat`)
          .withAutomaticReconnect()
          .configureLogging(LogLevel.Debug)
          .build()

        conn.on('JoinChatRoom', (conversation, message) => {
          setConversation(conversation)
          console.log('🚀 ~ conn.on ~ senderId:', conversation)
          console.log('🚀 ~ conn.on ~ message:', message)
        })

        conn.on('ReceiveMessage', (message: Message) => {
          console.log('🚀 ~ conn.on ~ message:', message)
          setMessages(prevMessages => {
            const cloneMessages = JSON.parse(JSON.stringify(prevMessages)) as Message[]
            cloneMessages.push(message)
            return cloneMessages
          })
        })

        conn.on('TestConnection', (message: string) => {
          console.log('🚀 ~ conn.on ~ message:', message)
        })

        conn.onclose(() => {
          console.log('Close connection')
        })

        await conn.start()
        await conn.invoke('TestConnection')
        await conn.invoke('JoinChatRoom', {
          eventId: 'ba831270-ef3a-49aa-8e87-bf014de374d5', // event: Ngày hội việc làm UIT
          hostId: '6f6134ee-bf6f-4cad-83fd-bf944a468ca2', // host: Tran Phuoc Anh Quoc
          userId: '20c024a1-8340-4ae6-9b7b-825e5788a08a', // user: Admin
        } as JoinChatRoomRequest)

        setConnection(conn)
      } catch (error) {
        console.log('🚀 ~ joinChatRoom ~ error:', error)
      }
    }
    joinChatRoom.current()
    ;() => joinChatRoom.current
  }, [])

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke('SendMessage', {
        conversationId: conversation?.id,
        userId: '20c024a1-8340-4ae6-9b7b-825e5788a08a',
        content: message,
      } as SendMessageRequest)
    } catch (error) {
      console.log('🚀 ~ sendMessage ~ error:', error)
    }
  }

  // sendMessage('Hello there')

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
                <TextComponent
                  // text={`${currentLocation.address.city}, ${currentLocation.address.county}`}
                  text="New York, USA"
                  flex={0}
                  color={appColor.white}
                  font={appFont.medium}
                  size={16}
                />
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
              icon={
                <CircleComponent size={20} color="#B1AEFA">
                  <Sort size={16} color="#5D56F3" />
                </CircleComponent>
              }
            />
          </RowComponent>
          <SpaceComponent height={20} />
        </View>
        <View style={{ marginBottom: -16 }}>
          <CategoriesList isFill />
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
          <TabBarComponent title="Upcoming Events" onPress={() => navigation.navigate('ExploreEventsScreen')} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({ length: 5 })}
            renderItem={({ item, index }) => <EventItem key={`event${index}`} item={itemEvent} type="card" />}
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
          <TabBarComponent title="Nearby You" onPress={() => {}} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({ length: 5 })}
            renderItem={({ item, index }) => <EventItem key={`event${index}`} item={itemEvent} type="card" />}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  )
}

export default HomeScreen
