import React, { useEffect, useState } from 'react'

//component
import ReviewItem from '@/components/ReviewItem'
import { View, ScrollView } from 'react-native'

//redux
import { useGetReviewsByUserIdQuery } from '@/redux/services/userApi'
import { useAppSelector } from '@/redux/hook'

//interface
import { IReview } from '@/interfaces/contents/review'

const ReviewProfile = () => {
  const user = useAppSelector(state => state.user.user)
  const { data } = useGetReviewsByUserIdQuery(user?.id!)

  const [reviews, setReviews] = useState<IReview[]>()

  useEffect(() => {
    if (data) {
      console.log(data.items)
      setReviews(data.items)
    }
  }, [data])

  return (
    <ScrollView>
      {reviews?.map(
        (review, index) => review.userId !== user?.id && <ReviewItem key={`review-${index}`} review={review} />,
      )}
    </ScrollView>
  )
}

export default ReviewProfile
