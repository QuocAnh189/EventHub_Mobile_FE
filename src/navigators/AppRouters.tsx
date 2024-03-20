import React from 'react';

//navigation
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

//redux
import { useAppSelector } from '../redux/hook';

const AppRouters = () => {
  const auth = useAppSelector(state => state.auth.authData);

  return <>{auth ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default AppRouters;
