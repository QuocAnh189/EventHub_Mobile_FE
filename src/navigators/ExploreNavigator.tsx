import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//screen
import HomeScreen from '../screens/home/HomeScreen'
import CategoryDetailScreen from '../screens/events/CategoryDetailScreen'

const ExploreNavigator = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CategoryDetailScreen" component={CategoryDetailScreen} />
    </Stack.Navigator>
  )
}

export default ExploreNavigator
