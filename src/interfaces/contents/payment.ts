export interface IPayment {
  id?: string
  eventId: string
  ticketQuantity: number
  userId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  totalPrice: number
  discount: number
  status: string
  paymentMethod: string
  paymentIntentId: string
  paymentSession: string
  createdAt?: Date
  updateAt?: Date
}
