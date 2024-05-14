import { appColor } from '@/constants'
import { IReview } from '@/interfaces/contents/review'
import dayjs from 'dayjs'
import { Image } from 'react-native'
import { View, Text } from 'react-native'

//icon
import AntDesign from 'react-native-vector-icons/AntDesign'

import userDefault from '../assets/images/user-default.png'

interface IProp {
  review: IReview
}

const ReviewItem = (props: IProp) => {
  const { review } = props
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
      }}
    >
      <View style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 10, paddingHorizontal: 30 }}>
        <Image
          source={{
            uri: review.userAvatar ? review.userAvatar : userDefault,
          }}
          width={40}
          height={40}
          borderRadius={20}
        />
        <View style={{ width: '60%' }}>
          <Text style={{ fontWeight: '700' }}>{review.fullName}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <AntDesign
                key={`rate-${index}`}
                name="star"
                size={20}
                color={item <= review.rate ? 'orange' : appColor.gray}
              />
            ))}
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ textAlign: 'justify' }}>{review.content}</Text>
          </View>
        </View>
        <View>
          <Text>{dayjs(review.createdAt).format('DD/MM/YYYY').toString()}</Text>
        </View>
      </View>
    </View>
  )
}

export default ReviewItem
