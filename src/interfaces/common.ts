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
  Layout?: (props: LayoutProps) => ReactElement
}
