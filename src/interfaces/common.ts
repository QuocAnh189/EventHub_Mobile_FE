import { ReactNode, ReactElement } from 'react'

export interface Route {
  name: string
  icon: any
  path?: string
  links?: { name: string; path: string }[]
}

export interface LayoutProps {
  children: ReactNode
}

export interface NextPageWithLayout {
  // eslint-disable-next-line no-unused-vars
  Layout?: (props: LayoutProps) => ReactElement
}
