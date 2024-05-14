import React, { useEffect, useState } from 'react'
import { TextInput, View } from 'react-native'
import events from '../../data/event'

//component
import {
  ButtonComponent,
  ContainerComponent,
  ListEventComponent,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  TagComponent,
} from '../../components'

//constant
import { appColor } from '../../constants'
import { global } from '../../styles/global'

//modal
import { LoadingModal } from '../../modals'

//icon
import { useIsFocused } from '@react-navigation/native'
import { SearchNormal1, Sort } from 'iconsax-react-native'

// import {debounce} from 'lodash';

//redux
import { useGetEventsQuery } from '@/redux/services/eventApi'
import { initParamsEvent } from '@/type/event'
import { IEvent } from '@/interfaces/contents/event'

const SearchEventsScreen = ({ navigation, route }: any) => {
  const [size, setSize] = useState(12)
  const [query, setQuery] = useState('')
  const { data, isFetching, refetch } = useGetEventsQuery({ ...initParamsEvent, size, search: query })

  const [searchKey, setSearchKey] = useState('')
  const [events, setEvents] = useState<IEvent[]>()

  const isFocused = useIsFocused()

  const getEvents = async () => {}

  const handleSearchEvent = async () => {}

  useEffect(() => {
    if (data) {
      setEvents(data?.items)
    }
  }, [data])

  return (
    <ContainerComponent back title="Search">
      <SectionComponent>
        <RowComponent>
          <RowComponent
            styles={{ flex: 1 }}
            onPress={() =>
              navigation.navigate('SearchEvents', {
                isFilter: false,
              })
            }
          >
            <SearchNormal1 variant="TwoTone" color={appColor.primary} size={20} />
            <View
              style={{
                width: 1,
                backgroundColor: appColor.primary,
                marginHorizontal: 10,
                height: 20,
              }}
            />
            <TextInput
              placeholder="Search"
              value={searchKey}
              onChangeText={val => setSearchKey(val)}
              style={[global.text, { flex: 1 }]}
            />
          </RowComponent>
          <TagComponent
            bgColor={appColor.primary}
            onPress={() => {
              setQuery(searchKey)
            }}
            label="Filters"
          />
        </RowComponent>
      </SectionComponent>

      {events?.length! > 0 ? (
        <ListEventComponent events={events!} />
      ) : (
        <LoadingComponent isLoading={isFetching} values={0} />
      )}
      <View style={{ paddingHorizontal: 20 }}>
        <ButtonComponent text="Load more" type="primary" onPress={() => setSize(pre => pre + 6)} />
      </View>
    </ContainerComponent>
  )
}

export default SearchEventsScreen
