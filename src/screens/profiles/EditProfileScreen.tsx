import React, { useState } from 'react'

//component
import {
  AvatarComponent,
  ButtonComponent,
  ButtonImagePicker,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from '../../components'

import { ImageOrVideo } from 'react-native-image-crop-picker'

//modal
import { LoadingModal } from '../../modals'
import { View } from 'react-native'

const EditProfileScreen = ({ navigation, route }: any) => {
  const [fileSelected, setFileSelected] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  const handleFileSelected = (val: ImageOrVideo) => {}

  const handleChangeValue = (key: string, value: string | Date | string[]) => {}

  const onUpdateProfile = async () => {}

  const handleUpdateProfile = async (data: any) => {}

  return (
    <ContainerComponent isScroll back title="Edit Profile">
      <SectionComponent>
        <RowComponent>
          <AvatarComponent
            photoURL="https://res.cloudinary.com/dadvtny30/image/upload/v1710062870/portfolio/frj9fscqteb90eumokqj.jpg"
            name="Anh Quoc"
            size={120}
          />
        </RowComponent>
        <SpaceComponent height={16} />
        <RowComponent>
          <ButtonImagePicker
            onSelect={(val: any) =>
              val.type === 'url' ? handleChangeValue('photoUrl', val.value as string) : handleFileSelected(val.value)
            }
          />
        </RowComponent>
        <InputComponent
          placeholder="Full name"
          allowClear
          value="Anh Quoc"
          onChange={val => handleChangeValue('name', val)}
        />
        <InputComponent
          placeholder="Give name"
          allowClear
          value="Anh Quoc"
          onChange={val => handleChangeValue('givenName', val)}
        />
        <InputComponent
          placeholder="Family name"
          allowClear
          value="Anh Quoc"
          onChange={val => handleChangeValue('familyName', val)}
        />
        <InputComponent
          placeholder="Giới thiệu"
          allowClear
          value="Hello every one, today i fell so good"
          multiline
          numberOfLine={5}
          onChange={val => handleChangeValue('bio', val)}
        />
      </SectionComponent>
      <View style={{ paddingHorizontal: 20 }}>
        <ButtonComponent disabled={true} text="Update" onPress={onUpdateProfile} type="primary" />
      </View>

      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  )
}

export default EditProfileScreen
