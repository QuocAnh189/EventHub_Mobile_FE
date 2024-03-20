import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

//components
import { DrawerCustom } from '../components';

//navigator
import TabNavigator from './TabNavigator';

//screen
import NotificationScreen from '../screens/others/NotificationScreen';
import CalendarScreen from '../screens/others/CalendarScreen';
import BookmarkScreen from '../screens/others/BookmarkScreen';
import HelpFAQScreen from '../screens/others/HelpFAQScreen';
import ContactSetting from '../screens/others/ContactUsScreen';
import SettingsScreen from '../screens/others/SettingsScreen';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
      }}
      drawerContent={props => <DrawerCustom {...props} />}
    >
      <Drawer.Screen name="HomeNavigator" component={TabNavigator} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="Bookmark" component={BookmarkScreen} />
      <Drawer.Screen name="Contact" component={ContactSetting} />
      <Drawer.Screen name="Setting" component={SettingsScreen} />
      <Drawer.Screen name="Help" component={HelpFAQScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
