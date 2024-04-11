import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'

//components
import { DrawerCustom } from '../components'

//navigator
import TabNavigator from './TabNavigator'

//screen
import NotificationScreen from '../screens/NotificationScreen'
import CalendarScreen from '../screens/drawer/CalendarScreen'
import BookmarkScreen from '../screens/drawer/BookmarkScreen'
import HelpFAQScreen from '../screens/drawer/HelpFAQScreen'
import ContactScreen from '../screens/drawer/ContactUsScreen'
import SettingsScreen from '../screens/drawer/SettingsScreen'

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
      }}
      drawerContent={props => <DrawerCustom {...props} />}
    >
      <Drawer.Screen name="HomeNavigator" component={TabNavigator} />
      <Drawer.Screen name="NotificationScreen" component={NotificationScreen} />
      <Drawer.Screen name="CalendarScreen" component={CalendarScreen} />
      <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
      <Drawer.Screen name="ContactScreen" component={ContactScreen} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
      <Drawer.Screen name="HelpFAQScreen" component={HelpFAQScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
