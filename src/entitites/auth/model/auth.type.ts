export interface RequestAccessResponse {
  status: string
  message?: string
}

export enum AccessRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED'
}

export type AccessRequest = {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: number
  status: AccessRequestStatus
  message: string | null
  adminNote: string | null
  processedAt: Date | null
  processedById: number | null
}
