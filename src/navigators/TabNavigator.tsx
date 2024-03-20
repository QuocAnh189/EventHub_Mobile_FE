import React, { ReactNode } from 'react';
import { Platform } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import ExploreNavigator from './ExploreNavigator';
import EventNavigator from './EventNavigator';
import AddNewScreen from '../screens/AddNewScreen';
import MapNavigator from './MapNavigator';
import ProfileNavigator from './ProfileNavigator';

//constant
import { appColor } from '../constants';

//components
import { TextComponent, CircleComponent } from '../components';

//icon
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 68 : 88,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: appColor.white,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon: ReactNode;
          color = focused ? appColor.primary : appColor.gray5;
          size = 24;
          switch (route.name) {
            case 'Explore':
              icon = <MaterialIcons name="explore" size={size} color={color} />;
              break;

            case 'Events':
              icon = <MaterialIcons name="event-note" size={size} color={color} />;
              break;
            case 'Map':
              icon = <Feather name="map-pin" size={size} color={color} />;
              break;
            case 'Profile':
              icon = <AntDesign name="user" size={size} color={color} />;
              break;

            case 'Add':
              icon = (
                <CircleComponent size={52} styles={{ marginTop: Platform.OS === 'ios' ? -50 : -60 }}>
                  <Ionicons name="add-circle" size={size} color={color} />
                </CircleComponent>
              );
              break;
          }
          return icon;
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarLabel({ focused }) {
          return route.name === 'Add' ? null : (
            <TextComponent
              text={route.name}
              flex={0}
              size={0}
              color={focused ? appColor.primary : appColor.gray5}
              styles={{
                marginBottom: Platform.OS === 'android' ? 12 : 0,
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Events" component={EventNavigator} />
      <Tab.Screen name="Add" component={AddNewScreen} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
