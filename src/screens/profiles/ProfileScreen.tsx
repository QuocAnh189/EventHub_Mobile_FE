import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, TouchableOpacity, Text } from 'react-native'

//component
import {
  AvatarComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components'

//style
import { global } from '../../styles/global'

//layout
import HiddenBottomLayout from '../../layout/HideBottomLayout'

//const
import { appColor, appFont } from '../../constants'

//icon
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import InfoProfile from './components/InfoProfile'

interface ButtonProps {
  title: string
  width: number
  icon: any
  onPress: () => void
}

const ButtonProfile = (props: ButtonProps) => {
  const { title, icon, width, onPress } = props
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderColor: appColor.primary,
        borderRadius: 12,
        borderWidth: 1,
      }}
    >
      {icon}
      <Text style={{ color: appColor.primary, fontFamily: appFont.medium }}>{title}</Text>
    </TouchableOpacity>
  )
}

const ProfileScreen = ({ navigation, route }: any) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    })
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      })
  }, [navigation])

  const handleFollow = async () => {}

  const handleMessage = async () => {}

  const navigateEditProfileScreen = () => {
    navigation.navigate('EditProfileScreen')
  }

  return (
    <HiddenBottomLayout navigation={navigation}>
      <ContainerComponent back title="Profile">
        <View style={{ position: 'absolute', right: 10, zIndex: 1 }}>
          <ButtonProfile
            onPress={navigateEditProfileScreen}
            title="Edit"
            icon={<FontAwesome5 name="edit" color={appColor.primary} size={20} />}
            width={100}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : true ? (
          <>
            <SectionComponent styles={[global.center]}>
              <RowComponent>
                <AvatarComponent
                  photoURL="https://res.cloudinary.com/dadvtny30/image/upload/v1710062870/portfolio/frj9fscqteb90eumokqj.jpg"
                  name="Anh Quoc"
                  size={120}
                />
              </RowComponent>
              <SpaceComponent height={16} />
              <TextComponent text="Anh Quoc" title size={24} />
              <SpaceComponent height={16} />
              <RowComponent justify="center">
                <View style={[global.center, { flex: 1 }]}>
                  <TextComponent title text={`350`} size={20} />
                  <TextComponent text="Following" />
                </View>
                <View style={[global.center, { flex: 1 }]}>
                  <TextComponent title text={`346`} size={20} />
                  <TextComponent text="Followers" />
                </View>
              </RowComponent>
            </SectionComponent>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {true ? (
                <View style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
                  <ButtonProfile
                    onPress={handleFollow}
                    title="Follow"
                    icon={<AntDesign name="adduser" color={appColor.primary} size={20} />}
                    width={150}
                  />
                  <ButtonProfile
                    onPress={handleMessage}
                    title="Messages"
                    width={150}
                    icon={<Feather name="message-circle" color={appColor.primary} size={20} />}
                  />
                </View>
              ) : (
                <ButtonProfile
                  onPress={navigateEditProfileScreen}
                  title="Edit Profile"
                  width={200}
                  icon={<FontAwesome5 name="edit" color={appColor.primary} size={20} />}
                />
              )}
            </View>
            <InfoProfile />
          </>
        ) : (
          <TextComponent text="profile not found!" />
        )}
      </ContainerComponent>
    </HiddenBottomLayout>
  )
}

export default ProfileScreen
