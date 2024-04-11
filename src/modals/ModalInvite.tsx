import React, { useState } from 'react'
import { Alert, Share, View, TouchableOpacity, Modal } from 'react-native'

//component
import { InputComponent } from '../components/InputComponent'
import { RowComponent } from '../components/RowComponent'
import { SectionComponent } from '../components/SectionComponent'
import { TextComponent } from '../components/TextComponent'
import { UserComponent } from '../components/UserComponent'

//constant
import { appColor, appFont } from '../constants'

//icon
import { ArrowLeft, SearchNormal1, TickCircle } from 'iconsax-react-native'

interface Props {
  visible: boolean
  onClose: () => void
}

export const ModalInvite = (props: Props) => {
  const { visible, onClose } = props

  const [friendIds, setFriendIds] = useState<string[]>([])
  const [useSelected, setUseSelected] = useState<string[]>([])

  const handleSelectedId = (id: string) => {
    const items: string[] = [...useSelected]
    const index = items.findIndex(element => element === id)

    if (index !== -1) {
      items.splice(index, 1)
    } else {
      items.push(id)
    }

    setUseSelected(items)
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message)
    }
  }

  return (
    <Modal>
      <SectionComponent styles={{ paddingTop: 50 }}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            width: 48,
            height: 48,
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={28} color={appColor.text} />
        </TouchableOpacity>
        <TextComponent title text="Invite Friend" size={24} font={appFont.medium} />
        <InputComponent
          styles={{ marginTop: 12, marginBottom: 24 }}
          placeholder="Search"
          value=""
          suffix={<SearchNormal1 size={20} color={appColor.primary} />}
          onChange={val => console.log('')}
        />
        {friendIds.length ? (
          friendIds.map((id: string) => (
            <RowComponent key={id}>
              <View style={{ flex: 1 }}>
                <UserComponent type="Invite" onPress={() => handleSelectedId(id)} userId={id} />
              </View>

              <TickCircle
                variant="Bold"
                size={24}
                color={useSelected.includes(id) ? appColor.primary : appColor.gray2}
              />
            </RowComponent>
          ))
        ) : (
          <TextComponent text="No friends" />
        )}
      </SectionComponent>
    </Modal>
  )
}
