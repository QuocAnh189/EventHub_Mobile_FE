import { Gender } from 'interfaces/constants/enum'

export interface ICreator {
  id: string
  userName: string
  email: string
  phomeNumber: string
  dob: Date
  fullName: string
  gender: Gender
  avatar: string
}
