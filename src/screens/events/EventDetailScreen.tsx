import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

//component
import {
  AvatarGroup,
  ButtonComponent,
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent,
  TagComponent,
  LoadingComponent,
} from '../../components'

//constant
import { global } from '../../styles/global'
import { appColor, appFont, appInfo } from '../../constants'

//icons
import { ArrowLeft, ArrowRight, Calendar, Location } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

//layout
import HiddenBottomLayout from '../../layout/HideBottomLayout'

//modal
import { LoadingModal, ModalInvite } from '../../modals'
import { useGetEventByIdQuery } from '@/redux/services/eventApi'

const EventDetailScreen = ({ navigation, route }: any) => {
  const [isVisibleModalInvite, setIsVisibleModalInvite] = useState(false)
  const { id }: { id: string } = route.params

  const { data: event, isFetching } = useGetEventByIdQuery(id)

  if (isFetching) {
    ;<LoadingComponent isLoading={isFetching} />
  }

  return (
    <HiddenBottomLayout navigation={navigation}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ position: 'absolute', top: 0, right: 0, zIndex: 1, left: 0 }}>
          <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}>
            <RowComponent
              styles={{
                padding: 16,
                alignItems: 'flex-end',
                paddingTop: 42,
              }}
            >
              <RowComponent styles={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    width: 48,
                    height: 48,
                    justifyContent: 'center',
                  }}
                >
                  <ArrowLeft size={28} color={appColor.white} />
                </TouchableOpacity>
                <TextComponent flex={1} text="Event Details" title color={appColor.white} />
                <CardComponent
                  onPress={() => {}}
                  styles={[global.noSpaceCard, { width: 36, height: 36 }]}
                  color={true ? '#ffffffB3' : '#ffffff4D'}
                >
                  <MaterialIcons name="bookmark" color={true ? appColor.danger2 : appColor.white} size={22} />
                </CardComponent>
              </RowComponent>
            </RowComponent>
          </LinearGradient>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}
        >
          <Image
            source={require('../../assets/images/event-image.png')}
            style={{ width: appInfo.sizes.WIDTH, height: 240, resizeMode: 'cover' }}
          />

          <SectionComponent styles={{ marginTop: -20 }}>
            {true ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <RowComponent
                  justify="space-between"
                  styles={[
                    global.shadow,
                    {
                      backgroundColor: appColor.white,
                      borderRadius: 100,
                      paddingHorizontal: 12,
                      width: '90%',
                    },
                  ]}
                >
                  {/* <AvatarGroup userIds={item.users} size={36} /> */}
                  <TouchableOpacity
                    onPress={() => setIsVisibleModalInvite(true)}
                    style={[global.button, { backgroundColor: appColor.primary, paddingVertical: 8 }]}
                  >
                    <TextComponent text="Invite" color={appColor.white} />
                  </TouchableOpacity>
                </RowComponent>
              </View>
            ) : (
              <>
                <ButtonComponent
                  onPress={() => setIsVisibleModalInvite(true)}
                  text="Invite"
                  styles={{ borderRadius: 100 }}
                  type="primary"
                />
              </>
            )}
          </SectionComponent>

          <View
            style={{
              backgroundColor: appColor.white,
            }}
          >
            <SectionComponent>
              <TextComponent title size={34} font={appFont.medium} text={event?.name!} />
            </SectionComponent>
            <SectionComponent>
              <RowComponent styles={{ marginBottom: 20 }}>
                <CardComponent styles={[global.noSpaceCard, { width: 48, height: 48 }]} color={`${appColor.primary}4D`}>
                  <Calendar variant="Bold" color={appColor.primary} size={24} />
                </CardComponent>
                <SpaceComponent width={16} />
                <View
                  style={{
                    flex: 1,
                    height: 48,
                    justifyContent: 'space-around',
                  }}
                >
                  <TextComponent text="14 December,2021" font={appFont.medium} size={16} />
                  <TextComponent text="Tuesday, 4:00PM - 9:00PM" color={appColor.gray} />
                </View>
              </RowComponent>
              <RowComponent styles={{ marginBottom: 20, alignItems: 'flex-start' }}>
                <CardComponent styles={[global.noSpaceCard, { width: 48, height: 48 }]} color={`${appColor.primary}4D`}>
                  <Location variant="Bold" color={appColor.primary} size={24} />
                </CardComponent>
                <SpaceComponent width={16} />
                <View
                  style={{
                    flex: 1,
                    minHeight: 48,
                    justifyContent: 'space-around',
                  }}
                >
                  <TextComponent text="Gala Convention Center" font={appFont.medium} size={16} />
                  <TextComponent text="36 Guild Street London, UK" color={appColor.gray} />
                </View>
              </RowComponent>
              {true && (
                <RowComponent
                  styles={{ marginBottom: 20 }}
                  // onPress={() =>
                  //   navigation.navigate('ProfileScreen', {
                  //     id: item.authorId,
                  //   })
                  // }
                >
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
                    <TextComponent text={event?.creator?.userName!} font={appFont.medium} size={16} />
                    <TextComponent text="Personal" color={appColor.gray} />
                  </View>

                  <TagComponent
                    label={true ? 'Unfollow' : 'Follow'}
                    onPress={() => {}}
                    styles={{
                      backgroundColor: `${appColor.primary}20`,
                      borderRadius: 12,
                    }}
                    textStyles={{ fontFamily: appFont.regular }}
                    textColor={appColor.primary}
                  />
                </RowComponent>
              )}
            </SectionComponent>
            <TabBarComponent title="About Event" />
            <SectionComponent>
              <TextComponent text={event?.description!} />
            </SectionComponent>
          </View>
          <SpaceComponent height={80} />
        </ScrollView>

        <LinearGradient
          colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 1)']}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 0,
            left: 0,
            paddingHorizontal: 12,
          }}
        >
          <ButtonComponent
            text="BUY TICKET $120"
            type="primary"
            onPress={() => {}}
            iconFlex="right"
            icon={
              <View
                style={[
                  global.iconContainer,
                  {
                    backgroundColor: '#3D56F0',
                  },
                ]}
              >
                <ArrowRight size={18} color={appColor.white} />
              </View>
            }
          />
        </LinearGradient>

        <LoadingModal visible={false} />

        {isVisibleModalInvite && (
          <ModalInvite visible={isVisibleModalInvite} onClose={() => setIsVisibleModalInvite(false)} />
        )}
      </View>
    </HiddenBottomLayout>
  )
}

export default EventDetailScreen
