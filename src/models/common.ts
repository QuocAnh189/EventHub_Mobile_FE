import { ReactNode, ReactElement } from 'react';

export interface LayoutProps {
  children: ReactNode;
  navigation: any;
}

export type NextPageWithLayout = {
  Layout?: (props: LayoutProps) => ReactElement;
};
