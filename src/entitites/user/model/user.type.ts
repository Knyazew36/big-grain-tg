import { User } from '@telegram-apps/sdk-react'

export enum Role {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR'
}
export interface IUser {
  id: number
  telegramId: string

  role: Role
  data: User
  createdAt: Date
}
