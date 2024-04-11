import React from 'react'

//navigation
import DrawerNavigator from './DrawerNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EventDetailScreen from '../screens/events/EventDetailScreen'
import ProfileScreenScreen from '../screens/profiles/ProfileScreen'
import SearchEventsScreen from '../screens/events/SearchEventsScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import ExploreEventsScreen from '../screens/events/ExploreEventsScreen'
import NotificationScreen from '../screens/NotificationScreen'

const MainNavigator = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreenScreen} />
      <Stack.Screen name="NotFoundScreen" component={NotFoundScreen} />
      <Stack.Screen name="ExploreEventsScreen" component={ExploreEventsScreen} />
      <Stack.Screen name="SearchEventsScreen" component={SearchEventsScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  )
}

export default MainNavigator
