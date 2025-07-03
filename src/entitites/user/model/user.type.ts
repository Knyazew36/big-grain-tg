export enum Role {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR'
}
export interface User {
  id: number
  username: string | null
  telegramId: string
  firstName: string | null
  lastName: string | null
  role: Role
  createdAt: Date
}
