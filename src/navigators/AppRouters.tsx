import React from 'react'

//navigation
import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator'

//redux
import { useAppSelector } from '../redux/hook'

const AppRouters = () => {
  const user = useAppSelector(state => state.user.user)

  return user ? <MainNavigator /> : <AuthNavigator />
}

export default AppRouters
