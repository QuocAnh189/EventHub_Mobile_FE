import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
// import { Modalize } from 'react-native-modalize';
// import { Portal } from 'react-native-portalize';

//component
import { ButtonComponent } from './ButtonComponent';
import { InputComponent } from './InputComponent';
import { RowComponent } from './RowComponent';
import { SpaceComponent } from './SpaceComponent';
import { TextComponent } from './TextComponent';

//const
import { global } from '@/styles/global';
import { appColor, appFont } from '@/constants';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ArrowDown2, SearchNormal1 } from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface SelectModel {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  values: SelectModel[];
  selected?: string | string[];
  onSelect: (val: string | string[]) => void;
  multible?: boolean;
}

export const DropdownPicker = (props: Props) => {
  const { onSelect, selected, values, label, multible } = props;
  const [searchKey, setSearchKey] = useState('');
  const [isVisibleModalize, setIsVisibleModalize] = useState(false);
  const modalieRef = useRef<any>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (isVisibleModalize) {
      modalieRef.current?.open();
    }
  }, [isVisibleModalize]);

  useEffect(() => {
    if (isVisibleModalize && selected) {
      setSelectedItems(multible ? (selected as string[]) : []);
    }
  }, [isVisibleModalize, selected, multible]);

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      const data = [...selectedItems];

      const index = selectedItems.findIndex(element => element === id);

      if (index !== -1) {
        data.splice(index, 1);
      }

      setSelectedItems(data);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const renderSelectedItem = (id: string) => {
    const item = values.find(element => element.value === id);

    return item ? (
      <RowComponent key={id} styles={[localStyles.selectedItem]}>
        <TextComponent
          text={`${item.label.includes('@') ? item.label.split('@')[0] : item.label}`}
          color={appColor.primary}
        />
        <SpaceComponent width={8} />
        <TouchableOpacity
          onPress={() => {
            handleSelectItem(id);
            onSelect(selectedItems);
          }}
        >
          <AntDesign name="close" size={18} color={appColor.text} />
        </TouchableOpacity>
      </RowComponent>
    ) : (
      <></>
    );
  };

  const renderSelectItem = (item: SelectModel) => {
    return (
      <RowComponent
        onPress={
          multible
            ? () => handleSelectItem(item.value)
            : () => {
                onSelect(item.value);
                modalieRef.current?.close();
              }
        }
        key={item.value}
        styles={[localStyles.listItem]}
      >
        <TextComponent
          text={item.label}
          flex={1}
          font={selectedItems?.includes(item.value) ? appFont.medium : appFont.regular}
          color={selectedItems?.includes(item.value) ? appColor.primary : appColor.text}
        />
        {selectedItems.includes(item.value) && (
          <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={22} color={appColor.primary} />
        )}
      </RowComponent>
    );
  };

  return (
    <View style={{ marginBottom: 8 }}>
      {label && <TextComponent text={label} styles={{ marginBottom: 8 }} />}
      <RowComponent
        styles={[global.inputContainer, { alignItems: 'flex-start' }]}
        onPress={() => setIsVisibleModalize(true)}
      >
        <RowComponent styles={{ flex: 1, flexWrap: 'wrap' }}>
          {selected ? (
            selectedItems.length > 0 ? (
              selectedItems.map(item => renderSelectedItem(item))
            ) : (
              <TextComponent text={values.find(element => element.value === selected)?.label ?? ''} />
            )
          ) : (
            <TextComponent text="Select" />
          )}
        </RowComponent>
        <ArrowDown2 size={22} color={appColor.gray} />
      </RowComponent>
      {/* <Portal>
        <Modalize
          handlePosition="inside"
          ref={modalieRef}
          FooterComponent={
            multible && (
              <View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
                <ButtonComponent
                  text="Agree"
                  type="primary"
                  onPress={() => {
                    onSelect(selectedItems);
                    modalieRef.current?.close();
                  }}
                />
              </View>
            )
          }
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          HeaderComponent={
            <RowComponent
              styles={{
                marginBottom: 12,
                paddingHorizontal: 20,
                paddingTop: 30,
              }}
            >
              <View style={{ flex: 1 }}>
                <InputComponent
                  styles={{ marginBottom: 0 }}
                  placeholder="Search..."
                  value={searchKey}
                  onChange={val => setSearchKey(val)}
                  allowClear
                  affix={<SearchNormal1 size={22} color={appColor.text} />}
                />
              </View>
              <SpaceComponent width={20} />
              <ButtonComponent type="link" text="Cancel" onPress={() => modalieRef.current?.close()} />
            </RowComponent>
          }
          onClose={() => setIsVisibleModalize(false)}
        >
          <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
            {values.map(item => renderSelectItem(item))}
          </View>
        </Modalize>
      </Portal> */}
    </View>
  );
};

const localStyles = StyleSheet.create({
  listItem: {
    marginBottom: 20,
  },
  selectedItem: {
    borderWidth: 0.5,
    borderColor: appColor.gray,
    padding: 4,
    marginBottom: 8,
    marginRight: 8,
    borderRadius: 8,
  },
});
