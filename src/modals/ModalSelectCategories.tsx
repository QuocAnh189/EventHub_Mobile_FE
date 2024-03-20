import { TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
// import {Modalize} from 'react-native-modalize';
// import {Portal} from 'react-native-portalize';

//component
import { ButtonComponent } from '../components/ButtonComponent'
import { RowComponent } from '../components/RowComponent'
import { SectionComponent } from '../components/SectionComponent'
import { TextComponent } from '../components/TextComponent'

//constant
import { global } from '../styles/global'
import { appColor } from '../constants'

interface Props {
  visible: boolean
  onClose: () => void
  onSelected: (vals: string[]) => void
  seletected?: string[]
  categories: any[]
}

export const ModalSelectCategories = (props: Props) => {
  const { visible, onClose, onSelected, seletected, categories } = props

  const [catsSelected, setCatsSelected] = useState<string[]>(seletected ?? [])

  const modalizeRef = useRef()
  // const auth = useSelector(authSelector);

  // useEffect(() => {
  //   if (visible) {
  //     modalizeRef.current?.open();
  //   } else {
  //     modalizeRef.current?.close();
  //   }
  // }, [visible]);

  const onSelectedCategory = (id: string) => {
    const items = [...catsSelected]
    const index = items.findIndex(element => element === id)

    if (index !== -1) {
      items.splice(index, 1)
      setCatsSelected(items)
    } else {
      setCatsSelected([...items, id])
    }
  }

  const handleUpdateInterests = async () => {
    // const api = `/update-interests?uid=${auth.id}`;
    // try {
    //   await userAPI.HandleUser(api, catsSelected, 'put');
    //   onSelected(catsSelected);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    // <Portal>
    //   <Modalize
    //     handlePosition="inside"
    //     adjustToContentHeight
    //     ref={modalizeRef}
    //     onClose={onClose}>
    <>
      <SectionComponent styles={{ padding: 30 }}>
        <RowComponent>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <TouchableOpacity
                // onPress={() => onSelectedCategory(category._id)}
                style={[
                  global.shadow,
                  global.center,
                  {
                    padding: 12,
                    marginRight: 8,
                    marginBottom: 8,
                    backgroundColor: appColor.white,
                    borderRadius: 12,
                    minWidth: 80,
                    borderWidth: 1,
                    borderColor: true ? appColor.primary : appColor.white,
                  },
                ]}
                key={index}
              >
                <TextComponent text="Development" />
              </TouchableOpacity>
            ))}
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent type="primary" onPress={handleUpdateInterests} text="Agree" />
      </SectionComponent>
    </>
    //   </Modalize>
    // </Portal>
  )
}
