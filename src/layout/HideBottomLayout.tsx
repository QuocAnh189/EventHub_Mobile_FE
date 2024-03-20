import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

interface Props {
  children: any
  navigation: any
}

const HiddenBottomLayout = ({ children, navigation }: Props) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    })
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      })
  }, [navigation])

  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc',
  },
})

export default HiddenBottomLayout
