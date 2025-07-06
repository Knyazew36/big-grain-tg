import { User } from '@telegram-apps/sdk-react'

export enum Role {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  GUEST = 'GUEST'
}
export interface IUser {
  id: number
  telegramId: string

  role: Role
  data: User
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface UpdateUserDto {
  role?: Role
  data?: Partial<User>
}
