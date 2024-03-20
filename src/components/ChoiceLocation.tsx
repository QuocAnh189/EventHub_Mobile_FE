import React, { useState } from 'react'

//const
import { global } from '@/styles/global'
import { appColor } from '@/constants'

//component
import { RowComponent } from './RowComponent'
import { SpaceComponent } from './SpaceComponent'
import { TextComponent } from './TextComponent'

//modal
import { ModalLocation } from '@/modals'

//icon
import { ArrowRight2, Location } from 'iconsax-react-native'

interface Props {
  onSelect: (val: any) => void
}

export const ChoiceLocation = (props: Props) => {
  const { onSelect } = props

  const [isVibleModalLocation, setIsVibleModalLocation] = useState(false)
  const [addressSelected, setAddressSelected] = useState<{
    address: string
    position?: {
      lat: number
      long: number
    }
  }>()

  return (
    <>
      <RowComponent onPress={() => setIsVibleModalLocation(!isVibleModalLocation)} styles={[global.inputContainer]}>
        <Location variant="Bold" size={22} color={`${appColor.primary}80`} />

        <SpaceComponent width={12} />

        <TextComponent numOfLine={1} text={addressSelected ? addressSelected.address : 'Choice'} flex={1} />
        <ArrowRight2 color={appColor.primary} size={22} />
      </RowComponent>

      <ModalLocation
        visible={isVibleModalLocation}
        onClose={() => setIsVibleModalLocation(false)}
        onSelect={(val: any) => {
          setAddressSelected(val)
          onSelect(val)
        }}
      />
    </>
  )
}
