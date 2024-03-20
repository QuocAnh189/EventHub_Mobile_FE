import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

//screen
import { SplashScreen } from './src/screens';

//navigator
import { NavigationContainer } from '@react-navigation/native';
import AppRouters from './src/navigators/AppRouters';

//font
import { useFonts } from 'expo-font';

//redux
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  useFonts({
    AirbnbCereal_W_Bd: require('./assets/fonts/AirbnbCereal_W_Bd.otf'),
    AirbnbCereal_W_Bk: require('./assets/fonts/AirbnbCereal_W_Bk.otf'),
    AirbnbCereal_W_Blk: require('./assets/fonts/AirbnbCereal_W_Blk.otf'),
    AirbnbCereal_W_Lt: require('./assets/fonts/AirbnbCereal_W_Lt.otf'),
    AirbnbCereal_W_Md: require('./assets/fonts/AirbnbCereal_W_Md.otf'),
    AirbnbCereal_W_XBd: require('./assets/fonts/AirbnbCereal_W_XBd.otf'),
  });
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <AppRouters />
        </NavigationContainer>
      )}
    </Provider>
  );
};

export default App;
