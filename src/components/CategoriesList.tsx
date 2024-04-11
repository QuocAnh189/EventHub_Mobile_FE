import React, { ReactNode } from 'react'
import { FlatList, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

//component
import { TagComponent } from './TagComponent'

//image
import { KnifeFork } from '@/assets/svgs'

//const
import { appColor } from '@/constants'

//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface Props {
  isFill?: boolean
}

interface Category {
  icon: ReactNode
  color: string
  label: string
  key: string
}

export const CategoriesList = (props: Props) => {
  const { isFill } = props
  const navigation: any = useNavigation()

  const categories: Category[] = [
    {
      key: 'sports',
      label: 'Sports',
      icon: <FontAwesome5 name="basketball-ball" color={isFill ? appColor.white : '#F0635A'} size={20} />,
      color: '#F0635A',
    },
    {
      key: 'mucsic',
      label: 'Music',
      icon: <FontAwesome5 name="music" color={isFill ? appColor.white : '#F59762'} size={20} />,
      color: '#F59762',
    },
    {
      key: 'food',
      label: 'Food',
      icon: <FontAwesome5 name="music" color={isFill ? appColor.white : '#F59762'} size={20} />,
      color: '#29D697',
    },
    {
      key: 'art',
      label: 'Art',
      icon: <Ionicons name="color-palette" color={isFill ? appColor.white : '#46CDFB'} />,
      color: '#46CDFB',
    },
  ]

  return (
    <FlatList
      style={{ paddingHorizontal: 16 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({ item, index }) => (
        <TagComponent
          styles={{
            marginRight: index === categories.length - 1 ? 28 : 12,
            minWidth: 82,
          }}
          bgColor={isFill ? item.color : appColor.white}
          onPress={() => {
            navigation.navigate('CategoryDetailScreen', {
              id: item.key,
              title: item.label,
            })
          }}
          icon={item.icon}
          label={item.label}
        />
      )}
    />
    // <Text>CC</Text>
  )
}
