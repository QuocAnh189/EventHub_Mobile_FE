import React from 'react'
import { View, StyleSheet, Platform, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native'

//components
import { RowComponent } from './RowComponent'
import { ButtonComponent } from './ButtonComponent'
import { SpaceComponent } from './SpaceComponent'
import { TextComponent } from './TextComponent'

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'

//constant
import { global } from '../styles/global'
import { appColor } from '../constants'

//redux
import { useAppSelector } from '@/redux/hook'
import { useAppDispatch } from '@/redux/hook'
import { signOut } from '@/redux/slices/authSlice'

export const DrawerCustom = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.authData?.user)

  const size = 20
  const color = appColor.gray
  const profileMenu = [
    {
      key: 'Profile',
      title: 'My Profile',
      icon: <AntDesign name="user" size={size} color={color} />,
    },
    {
      key: 'Notification',
      title: 'Notification',
      icon: <Feather name="message-circle" size={size} color={color} />,
    },
    {
      key: 'Calendar',
      title: 'Calendar',
      icon: <Feather name="calendar" size={size} color={color} />,
    },
    {
      key: 'Bookmark',
      title: 'Bookmark',
      icon: <Feather name="bookmark" size={size} color={color} />,
    },
    {
      key: 'Contact',
      title: 'Contact Us',
      icon: <Feather name="mail" size={size} color={color} />,
    },
    {
      key: 'Setting',
      title: 'Settings',
      icon: <Feather name="settings" size={size} color={color} />,
    },
    {
      key: 'Help',
      title: 'Help & FAQs',
      icon: <AntDesign name="questioncircleo" size={size} color={color} />,
    },
    {
      key: 'SignOut',
      title: 'Sign Out',
      icon: <MaterialCommunityIcons name="logout" size={size} color={color} />,
    },
  ]

  const handleSignOut = async () => {
    // const userId = auth?.user._id;
    // await SignOut(userId)
    //   .then(() => {
    //     dispatch(signOut());
    //   })
    //   .catch(e => console.log(e));
    dispatch(signOut())
  }

  const handleNavigate = (name: string) => {
    navigation.navigate(name)
    navigation.closeDrawer()
  }

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer()
          navigation.navigate('Profile', {
            screen: 'ProfileScreen',
          })
        }}
      >
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dadvtny30/image/upload/v1708676847/organicfood/blog/tr0qanq8r2gadkrxlymo.png',
          }}
          style={styles.avatar}
        />
        <TextComponent text="Anh Quoc" title size={18} />
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{ flex: 1, marginVertical: 20 }}
        renderItem={({ item, index }) => (
          <RowComponent
            styles={[styles.listItem]}
            onPress={item.key === 'SignOut' ? handleSignOut : () => handleNavigate(item.key)}
          >
            {item.icon}
            <TextComponent text={item.title} styles={styles.listItemText} />
          </RowComponent>
        )}
      />
      <RowComponent justify="flex-start">
        <TouchableOpacity style={[global.button, { backgroundColor: '#00F8FF33', height: 'auto' }]}>
          <MaterialCommunityIcons name="crown" size={22} color="#00F8FF" />
          <SpaceComponent width={8} />
          <TextComponent color="#00F8FF" text="Upgrade Pro" />
        </TouchableOpacity>
      </RowComponent>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginBottom: 12,
  },

  listItem: {
    paddingVertical: 20,
    justifyContent: 'flex-start',
  },

  listItemText: {
    paddingLeft: 12,
  },
})
