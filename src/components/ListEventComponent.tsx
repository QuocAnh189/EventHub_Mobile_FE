import React from 'react'
import { ScrollView } from 'react-native'

//component
import { EventItem } from './EventItem'
import { IEvent } from '@/interfaces/contents/event'

interface Props {
  events: IEvent[]
}

export const ListEventComponent = (props: Props) => {
  const { events } = props

  return (
    <ScrollView>
      {events.map((event: IEvent, index: number) => (
        <EventItem event={event} key={`ticket-${index}`} type="list" styles={{ flex: 1, width: undefined }} />
      ))}
    </ScrollView>
  )
}
