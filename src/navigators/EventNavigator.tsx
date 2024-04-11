import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//screen
import EventsScreen from '../screens/events/EventsScreenScreen'

const EventNavigator = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
    </Stack.Navigator>
  )
}

export default EventNavigator
