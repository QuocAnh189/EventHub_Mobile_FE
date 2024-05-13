export interface Message {
  id: string
  content?: string
  imageId?: string
  videoId?: string
  userId: string
  conversationId: string
  createdAt: Date
  updatedAt?: Date
}
