import { EEventStatus } from '../../constants/enum'
import { IPriceRange } from '../systems/price-range'

export interface IEvent {
  id: string
  creatorId: string
  creator: any
  coverImageId: string
  coverImage: string
  name: string
  description: string
  location: string
  PriceRange: IPriceRange
  startTime: any
  endTime: any
  ticketTypes: any
  categories: string[]
  promotion: number
  numberOfFavourites: number
  numberOfShares: number
  numberOfSoldTickets: number
  status: EEventStatus
  createdAt: Date
  updatedAt: Date
}
