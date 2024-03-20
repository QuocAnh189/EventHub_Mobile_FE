import React from 'react';

//navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import OnboardScreen from '../screens/auth/OnboardScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import VerifyScreen from '../screens/auth/VerificationScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPassScreen from '../screens/auth/ResetPassScreen';

//redux
import { useAppSelector } from '../redux/hook';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  const isFirst = useAppSelector(state => state.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
      {/* {!isFirst && <Stack.Screen name="OnboardScreen" component={OnboardScreen} />} */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
      <Stack.Screen name="ResetPassScreen" component={ResetPassScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
