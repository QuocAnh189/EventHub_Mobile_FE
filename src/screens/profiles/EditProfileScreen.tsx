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
import { useAppSelector } from '@/redux/hook'

const EditProfileScreen = ({ navigation, route }: any) => {
  const [fileSelected, setFileSelected] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  const user = useAppSelector(state => state.user.user)

  const handleFileSelected = (val: ImageOrVideo) => {}

  const handleChangeValue = (key: string, value: string | Date | string[]) => {}

  const onUpdateProfile = async () => {}

  const handleUpdateProfile = async (data: any) => {}

  return (
    <ContainerComponent isScroll back title="Edit Profile">
      <SectionComponent>
        <RowComponent>
          <AvatarComponent photoURL={user?.avatar} name="Anh Quoc" size={120} />
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
          value={user?.fullName!}
          onChange={val => handleChangeValue('name', val)}
        />
        <InputComponent
          placeholder="User"
          allowClear
          value={user?.userName!}
          onChange={val => handleChangeValue('givenName', val)}
        />
        <InputComponent
          placeholder="Email"
          allowClear
          value={user?.email!}
          onChange={val => handleChangeValue('familyName', val)}
        />
        <InputComponent
          placeholder="Bio"
          allowClear
          value={user?.bio!}
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
