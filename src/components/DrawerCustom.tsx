import React from 'react'
import { View, StyleSheet, Platform, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native'

//components
import { RowComponent } from './RowComponent'
import { SpaceComponent } from './SpaceComponent'
import { TextComponent } from './TextComponent'

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

//constant
import { global } from '../styles/global'
import { profileMenu } from '../constants'

//redux
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { useSignOutMutation } from '@/redux/services/authApi'
import { setUser } from '@/redux/slices/userSlice'

export const DrawerCustom = ({ navigation }: any) => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.user.user)

  const [signOut] = useSignOutMutation()

  const handleSignOut = async () => {
    const result = await signOut().unwrap()
    if (result) {
      dispatch(setUser(null))
    }
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
            uri: user?.avatar,
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
