import React, { useEffect, useState } from 'react'
import { TextInput, View } from 'react-native'
import events from '../../data/event'

//component
import {
  CircleComponent,
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

const SearchEventsScreen = ({ navigation, route }: any) => {
  // const [events, setEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const isFocused = useIsFocused()

  const getEvents = async () => {}

  const handleSearchEvent = async () => {}

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
            onPress={() => {}}
            label="Filters"
            icon={
              <CircleComponent size={20} color={appColor.white}>
                <Sort size={16} color={appColor.primary} />
              </CircleComponent>
            }
          />
        </RowComponent>
      </SectionComponent>

      {events.length > 0 ? (
        <ListEventComponent items={events} />
      ) : (
        <LoadingComponent isLoading={isLoading} values={results.length} />
      )}
    </ContainerComponent>
  )
}

export default SearchEventsScreen
