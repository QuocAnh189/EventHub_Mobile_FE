import React from 'react'
import { View, Modal, ActivityIndicator } from 'react-native'

//component
import { TextComponent } from '@/components/TextComponent'

interface Props {
  visible: boolean
  mess?: string
}

export const LoadingModal = (props: Props) => {
  const { visible } = props

  return (
    <Modal visible={visible} style={[{ flex: 1 }]} transparent statusBarTranslucent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator color={'#ffffff'} size={32} />
        <TextComponent text="Loading" flex={0} color={'#ffffff'} />
      </View>
    </Modal>
  )
}
