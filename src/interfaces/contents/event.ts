import { EventStatus } from 'interfaces/constants/enum'
import { ICategory } from './category'
import { IPriceRange } from 'interfaces/systems/price-range'

export interface IEventDetail {
  id: string
  creatorId: string
  creatorName: string
  coverImageId: string
  coverImage: string
  name: string
  descrption: string
  locationId: string
  locationString: string
  PriceRange: IPriceRange
  startTime: Date
  endTime: Date
  categories: ICategory
  promotion: number
  numberOfFavourites: number
  numberOfShares: number
  numberOfSoldTickets: number
  status: EventStatus
  createdAt: Date
  updatedAt: Date
}
