import React from 'react'
import { FlatList, ScrollView } from 'react-native'

//component
import { EventModel } from '../models/EventModel'
import { EventItem } from './EventItem'

interface Props {
  items: any[]
}

export const ListEventComponent = (props: Props) => {
  const { items } = props
  return (
    // <FlatList
    //   data={items}
    //   renderItem={({ item }) => (
    //     <EventItem item={item} key={item?._id} type="list" styles={{ flex: 1, width: undefined }} />
    //   )}
    // />
    <ScrollView>
      {/* Other components */}
      {items.map(item => (
        <EventItem item={item} key={item?._id} type="list" styles={{ flex: 1, width: undefined }} />
      ))}
    </ScrollView>
  )
}
