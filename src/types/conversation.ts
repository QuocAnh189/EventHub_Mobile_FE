export type JoinChatRoomRequest = {
  eventId: string
  hostId: string
  userId: string
}

export type SendMessageRequest = {
  userId: string
  conversationId: string
  content: string
}
