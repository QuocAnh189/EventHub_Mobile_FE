import React, { useState } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker';

//component
import { RowComponent } from './RowComponent';
import { TextComponent } from './TextComponent';

//const
import { global } from '@/styles/global';
import { appColor, appFont } from '@/constants';

//icons
import { ArrowDown2, Calendar, Clock } from 'iconsax-react-native';

//untils
import { DateTime } from '@/utils/DateTime';

interface Props {
  selected?: Date;
  type: 'date' | 'time';
  onSelect: (val: Date) => void;
  label?: string;
}

export const DateTimePicker = (props: Props) => {
  const { type, onSelect, selected, label } = props;
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {label && <TextComponent text={label} styles={{ marginBottom: 8 }} />}

      <RowComponent styles={[global.inputContainer]} onPress={() => setIsShowDatePicker(true)}>
        <TextComponent
          text={` ${selected ? (type === 'time' ? DateTime.GetTime(selected) : DateTime.GetDate(selected)) : 'Choice'}`}
          flex={1}
          font={appFont.medium}
          styles={{ textAlign: 'center' }}
        />
        {type === 'time' ? <Clock size={22} color={appColor.gray} /> : <Calendar size={22} color={appColor.gray} />}
      </RowComponent>
      <DatePicker
        mode={type}
        open={isShowDatePicker}
        date={new Date()}
        modal
        onCancel={() => setIsShowDatePicker(false)}
        onConfirm={val => {
          setIsShowDatePicker(false);
          onSelect(val);
        }}
      />
    </View>
  );
};
