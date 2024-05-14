//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'

//constant
import { appColor } from './colors'

export const profileMenu = [
  {
    key: 'ProfileScreen',
    title: 'My Profile',
    icon: <AntDesign name="user" size={20} color={appColor.gray} />,
  },
  {
    key: 'NotificationScreen',
    title: 'Notification',
    icon: <Feather name="message-circle" size={20} color={appColor.gray} />,
  },
  {
    key: 'CalendarScreen',
    title: 'Calendar',
    icon: <Feather name="calendar" size={20} color={appColor.gray} />,
  },
  {
    key: 'BookmarkScreen',
    title: 'Bookmark',
    icon: <Feather name="bookmark" size={20} color={appColor.gray} />,
  },
  {
    key: 'ContactScreen',
    title: 'Contact Us',
    icon: <Feather name="mail" size={20} color={appColor.gray} />,
  },
  {
    key: 'SettingsScreen',
    title: 'Settings',
    icon: <Feather name="settings" size={20} color={appColor.gray} />,
  },
  {
    key: 'HelpFAQScreen',
    title: 'Help & FAQs',
    icon: <AntDesign name="questioncircleo" size={20} color={appColor.gray} />,
  },
  {
    key: 'SignOut',
    title: 'Sign Out',
    icon: <MaterialCommunityIcons name="logout" size={20} color={appColor.gray} />,
  },
]
