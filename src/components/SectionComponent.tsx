import React, { ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

//style
import { global } from '@/styles/global';

interface Props {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
}

export const SectionComponent = (props: Props) => {
  const { children, styles } = props;
  return <View style={[global.section, styles]}>{children}</View>;
};
