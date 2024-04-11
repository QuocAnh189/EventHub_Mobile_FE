import { Gender, UserStatus } from 'interfaces/constants/enum'

export interface IUser {
  id: string
  userName: string
  email: string
  phoneNumber: number
  dob: Date
  fullName: string
  gender: Gender
  bio: string
  avatar: string
  status: UserStatus
  numberOfFollowers: number
  numberOfFolloweds: number
  numberOfFavourites: number
  numberOfCreatedEvents: number
  roles: string[]
  createdAt: Date
  updateAp: Date
}
