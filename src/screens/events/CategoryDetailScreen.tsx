import React, { useEffect, useState } from 'react'

//component
import { ContainerComponent, ListEventComponent, LoadingComponent } from '../../components'

const CategoryDetailScreen = ({ navigation, route }: any) => {
  const { id, title }: { id: string; title: string } = route.params

  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState<any[]>([])

  return (
    <ContainerComponent title={title} back isScroll={false}>
      {events.length > 0 ? (
        <ListEventComponent items={events} />
      ) : (
        <LoadingComponent isLoading={isLoading} values={events.length} />
      )}
    </ContainerComponent>
  )
}

export default CategoryDetailScreen
