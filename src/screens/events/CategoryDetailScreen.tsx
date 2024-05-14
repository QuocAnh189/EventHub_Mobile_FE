import React, { useEffect, useState } from 'react'

//component
import { ContainerComponent, ListEventComponent, LoadingComponent } from '@/components'

//redux
import { useGetEventsQuery } from '@/redux/services/eventApi'

const CategoryDetailScreen = ({ navigation, route }: any) => {
  const { id, title }: { id: string; title: string } = route.params

  const { data } = useGetEventsQuery({ categoryIds: [id] })

  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    if (data) {
      setEvents(data.items)
    }
  }, [data])

  return (
    <ContainerComponent title={title} back isScroll={false}>
      {events.length > 0 ? (
        <ListEventComponent events={events} />
      ) : (
        <LoadingComponent isLoading={isLoading} values={events.length} />
      )}
    </ContainerComponent>
  )
}

export default CategoryDetailScreen
