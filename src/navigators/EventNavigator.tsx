import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//screen
import EventsScreen from '../screens/events/EventsScreenScreen'
import SearchEventsScreen from '../screens/events/SearchEventsScreen'

const EventNavigator = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="EventsScreen" component={SearchEventsScreen} />
    </Stack.Navigator>
  )
}

export default EventNavigator
