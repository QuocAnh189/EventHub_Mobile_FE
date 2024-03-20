import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screen
import MapScreen from '../screens/maps/MapScreen';

const MapNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};

export default MapNavigator;
