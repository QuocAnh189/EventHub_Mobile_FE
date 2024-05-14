import React, { useEffect, useState } from 'react'
import events from '../../data/event'

//component
import {
  ButtonComponent,
  ContainerComponent,
  ListEventComponent,
  LoadingComponent,
  RowComponent,
  SpaceComponent,
} from '../../components'

//const
import { appColor } from '../../constants'

//icon
import { MoreCircle, SearchNormal1 } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const ExploreEventsScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <ContainerComponent
      back
      title="Events"
      right={
        <RowComponent>
          <ButtonComponent
            onPress={() => navigation.navigate('SearchEvents')}
            icon={<SearchNormal1 size={20} color={appColor.text} />}
          />
          <SpaceComponent width={12} />
          <ButtonComponent icon={<MaterialIcons name="more-vert" size={22} color={appColor.text} />} />
        </RowComponent>
      }
    >
      {events.length > 0 ? (
        <ListEventComponent events={events} />
      ) : (
        <LoadingComponent isLoading={isLoading} values={events.length} />
      )}
    </ContainerComponent>
  )
}

export default ExploreEventsScreen
