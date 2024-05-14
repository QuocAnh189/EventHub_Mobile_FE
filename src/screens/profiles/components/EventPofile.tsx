import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import { IEvent } from '@/interfaces/contents/event'
import { EventItem } from '@/components'
import { useGetEventsByUserIdQuery } from '@/redux/services/userApi'
import { useAppSelector } from '@/redux/hook'
import { Size } from 'iconsax-react-native'

const EventProfile = () => {
  const user = useAppSelector(state => state.user.user)

  const [events, setEvents] = useState<IEvent[]>([])

  const { data } = useGetEventsByUserIdQuery({
    userId: user?.id!,
    params: null,
  })

  useEffect(() => {
    if (data) {
      setEvents(data.items)
    }
  }, [data])

  return (
    <ScrollView>
      {events &&
        events?.map((event: IEvent, index: number) => (
          <EventItem event={event} key={`ticket-${index}`} type="list" styles={{ flex: 1, width: undefined }} />
        ))}
    </ScrollView>
  )
}

export default EventProfile
