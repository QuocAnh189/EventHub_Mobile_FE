import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

//constant
import { appColor, appFont } from '../../../constants'

//icon
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const categories = [
  { name: 'Games Online', color: 'purple' },
  { name: 'Concert', color: 'red' },
  { name: 'Music', color: 'orange' },
  { name: 'Art', color: 'purple' },
  { name: 'Movie', color: 'green' },
  { name: 'Others', color: 'blue' },
]

interface Props {}

const AboutProfile = (props: Props) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ paddingVertical: 10, fontSize: 22 }}>About Me</Text>
        <Text style={{ paddingVertical: 10, fontSize: 18, textAlign: 'justify' }}>
          Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food
          truck will be available for purchase
          <Text style={{ color: appColor.primary }}> Read More</Text>
        </Text>
      </View>

      <View style={{ paddingHorizontal: 20, width: '100%' }}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ paddingVertical: 10, fontSize: 22 }}>Change</Text>
          <TouchableOpacity
            style={{
              display: 'flex',
              backgroundColor: appColor.gray3,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              borderRadius: 22,
              padding: 12,
            }}
          >
            <FontAwesome5 name="edit" color={appColor.primary} size={20} />
            <Text style={{ color: appColor.primary, fontFamily: appFont.medium }}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
          {categories.map((category, index) => (
            <View
              key={index}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 14,
                backgroundColor: category.color,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: appColor.white }}>{category.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default AboutProfile
