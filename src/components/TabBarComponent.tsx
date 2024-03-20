import React from 'react'

//component
import { RowComponent } from './RowComponent'
import { TextComponent } from './TextComponent'

//constant
import { appColor } from '@/constants'

//icon
import AntDesign from 'react-native-vector-icons/AntDesign'

interface Props {
  title: string
  onPress?: () => void
}

export const TabBarComponent = (props: Props) => {
  const { title, onPress } = props

  return (
    <RowComponent
      styles={{
        marginBottom: 20,
        paddingHorizontal: 16,
      }}
    >
      <TextComponent text={title} title flex={1} size={18} />
      {onPress && (
        <RowComponent onPress={onPress}>
          <TextComponent text="See All " size={12} color={appColor.text2} />
          <AntDesign size={14} color={appColor.text2} name="arrowright" />
        </RowComponent>
      )}
    </RowComponent>
  )
}
