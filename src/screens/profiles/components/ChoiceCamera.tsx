import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

//component
import { ButtonComponent, ContainerComponent, SectionComponent } from '../../../components'

const ChoiceCamera = ({ navigation, route }: any) => {
  const [data, setdata] = useState<{
    width: number
    height: number
  }>()
  const [imageUrl, setImageUrl] = useState('')

  return (
    <ContainerComponent>
      <SectionComponent>
        <Text>ChoiceCamera</Text>
        <ButtonComponent
          text="go to camera"
          onPress={() =>
            navigation.navigate('CameraScreen', {
              width: data?.width,
              height: data?.height,
            })
          }
        />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default ChoiceCamera
