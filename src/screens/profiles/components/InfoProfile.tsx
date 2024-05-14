import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'

//component
import { RowComponent, SectionComponent, TextComponent } from '../../../components'
import AboutProfile from './AboutProfile'

//constant
import { global } from '../../../styles/global'
import { appColor, appFont } from '../../../constants'

//modal
import { LoadingModal } from '../../../modals'
import EventProfile from './EventPofile'
import ReviewProfile from './ReviewProfile'

interface Props {}

const InfoProfile = (props: Props) => {
  const [tabSelected, setTabSelected] = useState('about')
  const [isLoading, setIsLoading] = useState(false)

  const tabs = [
    {
      key: 'about',
      title: 'About',
    },
    {
      key: 'events',
      title: 'Events',
    },
    {
      key: 'reviews',
      title: 'Reviews',
    },
  ]

  const renderTabContent = (id: string) => {
    let content = <></>

    switch (id) {
      case 'about':
        content = <AboutProfile />
        break

      case 'events':
        content = <EventProfile />
        break

      case 'reviews':
        content = <ReviewProfile />
        break
      default:
        break
    }
    return content
  }

  const handleToggleFollowing = async () => {}

  return (
    <View style={{ marginTop: 20 }}>
      <SectionComponent>
        <RowComponent>
          {tabs.map(item => (
            <TouchableOpacity
              onPress={() => setTabSelected(item.key)}
              style={[
                global.center,
                {
                  flex: 1,
                },
              ]}
              key={item.key}
            >
              <TextComponent
                text={item.title}
                font={item.key === tabSelected ? appFont.medium : appFont.regular}
                color={item.key === tabSelected ? appColor.primary : appColor.text}
                size={16}
              />
              <View
                style={{
                  width: 80,
                  borderRadius: 100,
                  marginTop: 6,
                  flex: 0,
                  height: 3,
                  backgroundColor: item.key === tabSelected ? appColor.primary : appColor.white,
                }}
              />
            </TouchableOpacity>
          ))}
        </RowComponent>
        {renderTabContent(tabSelected)}
      </SectionComponent>

      <LoadingModal visible={isLoading} />
    </View>
  )
}

export default InfoProfile
