//hook
import React from 'react'
import { useNavigation } from '@react-navigation/native'

//component
import { FlatList } from 'react-native'
import { TagComponent } from './TagComponent'

//const
import { appColor } from '@/constants'

//redux
import { useGetCategoriesQuery } from '@/redux/services/categoryApi'

interface Props {
  isFill?: boolean
}

export const CategoriesList = (props: Props) => {
  const { isFill } = props
  const navigation: any = useNavigation()

  const { data: categories } = useGetCategoriesQuery()

  return (
    <FlatList
      style={{ paddingHorizontal: 16 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({ item, index }) => (
        <TagComponent
          styles={{
            marginRight: index === categories!.length - 1 ? 28 : 12,
            minWidth: 82,
          }}
          bgColor={isFill ? item.color : appColor.white}
          onPress={() => {
            navigation.navigate('CategoryDetailScreen', {
              id: item.id,
              title: item.name,
            })
          }}
          icon={item.iconImage}
          label={item.name}
        />
      )}
    />
  )
}
