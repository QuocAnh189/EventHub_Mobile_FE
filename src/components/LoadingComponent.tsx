import React from 'react'
import { View, ActivityIndicator } from 'react-native'

//style
import { global } from '@/styles/global'

//component
import { TextComponent } from './TextComponent'

interface Props {
  isLoading: boolean
  values?: number
  mess?: string
}

export const LoadingComponent = (props: Props) => {
  const { isLoading, values, mess } = props

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      {isLoading ? <ActivityIndicator /> : values === 0 && <TextComponent text={mess ?? 'Data not found!'} />}
    </View>
  )
}
