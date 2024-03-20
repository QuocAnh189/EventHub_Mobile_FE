import React, { ReactNode, useRef, useState } from 'react'
import { View, Modal, TouchableOpacity } from 'react-native'
// import { Modalize } from 'react-native-modalize';
// import { Portal } from 'react-native-portalize';

//component
import { ButtonComponent } from './ButtonComponent'
import { InputComponent } from './InputComponent'
import { RowComponent } from './RowComponent'
import { SpaceComponent } from './SpaceComponent'
import { TextComponent } from './TextComponent'

//constant
import { global } from '@/styles/global'
import { appColor, appFont } from '@/constants'

// import ImageCropPicker, { ImageOrVideo, Options } from 'react-native-image-crop-picker';

//icons
import { Camera, Image, Link } from 'iconsax-react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

interface Props {
  onSelect: (val: { type: 'url' | 'file'; value: string | any }) => void
}

export const ButtonImagePicker = (props: Props) => {
  const { onSelect } = props

  const [imageUrl, setImageUrl] = useState('')
  const [isVisibleModalAddUrl, setIsVisibleModalAddUrl] = useState(false)

  const options: any = {
    cropping: true,
    mediaType: 'photo',
  }

  const choiceImages = [
    {
      key: 'camera',
      title: 'Take a picture',
      icon: <Camera size={22} color={appColor.text} />,
    },
    {
      key: 'library',
      title: 'From Library',
      icon: <Image size={22} color={appColor.text} />,
    },
    {
      key: 'url',
      title: 'From url',
      icon: <Link size={22} color={appColor.text} />,
    },
  ]

  const renderItem = (item: { icon: ReactNode; key: string; title: string }) => (
    <RowComponent key={item.key} styles={{ marginBottom: 20 }} onPress={() => handleChoiceImage(item.key)}>
      {item.icon}
      <SpaceComponent width={12} />
      <TextComponent text={item.title} flex={1} font={appFont.medium} />
    </RowComponent>
  )

  const handleChoiceImage = (key: string) => {
    // switch (key) {
    //   case 'library':
    //     ImageCropPicker.openPicker(options).then(res => {
    //       onSelect({ type: 'file', value: res });
    //     });
    //     break;
    //   case 'camera':
    //     ImageCropPicker.openCamera(options).then(res => {
    //       onSelect({ type: 'file', value: res });
    //     });
    //     break;
    //   default:
    //     setIsVisibleModalAddUrl(true);
    //     break;
    // }
    // modalizeRef.current?.close();
  }

  return (
    <View style={{ marginBottom: 20 }}>
      <ButtonComponent text="Upload image" onPress={() => {}} type="link" />
      <View style={{ paddingHorizontal: 20, width: 200, marginTop: 20 }}>
        {choiceImages.map(item => renderItem(item))}
      </View>

      <Modal visible={isVisibleModalAddUrl} statusBarTranslucent style={{ flex: 1 }} transparent animationType="slide">
        <View
          style={[
            global.container,
            {
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <View
            style={{
              backgroundColor: appColor.white,
              margin: 20,
              borderRadius: 12,
              width: '90%',
              padding: 20,
            }}
          >
            <RowComponent justify="flex-end">
              <TouchableOpacity
                onPress={() => {
                  setImageUrl('')
                  setIsVisibleModalAddUrl(false)
                }}
              >
                <AntDesign name="close" size={24} color={appColor.text} />
              </TouchableOpacity>
            </RowComponent>

            <TextComponent text="Image URL" title size={18} />
            <InputComponent placeholder="URL" value={imageUrl} onChange={val => setImageUrl(val)} allowClear />
            <RowComponent justify="flex-end">
              <ButtonComponent
                type="link"
                text="Agree"
                onPress={() => {
                  setIsVisibleModalAddUrl(false)
                  onSelect({ type: 'url', value: imageUrl })
                  setImageUrl('')
                }}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </View>
  )
}
