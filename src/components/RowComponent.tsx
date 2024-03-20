import React, { ReactNode } from 'react';
import { View, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';

//style
import { global } from '@/styles/global';

interface Props {
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined;
  styles?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPress?: () => void;
}

export const RowComponent = (props: Props) => {
  const { styles, justify, children, onPress } = props;

  const localStyle = [
    global.row,
    {
      justifyContent: justify,
    },
    styles,
  ];

  return onPress ? (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={localStyle}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={localStyle}>{children}</View>
  );
};
