export interface IReview {
  id: string
  userId: string
  fullName: string
  userAvatar: string
  eventId: string
  eventName: string
  content: string
  rate: number
  createdAt: Date
  updatedAt: Date
}
