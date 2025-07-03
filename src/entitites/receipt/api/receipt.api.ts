import { AxiosResponse } from 'axios'
import { $api } from '@/shared/api' // ваш axios instance
import { apiDomain } from '@/shared/api/model/constants' // ваш базовый url
import { BaseResponse } from '@/shared/api'
import { Receipt } from '../model/receipt.type'

export interface CreateReceiptDto {
  productId: number
  quantity: number
}

export const receiptCreate = async (dto: CreateReceiptDto): Promise<Receipt> => {
  try {
    const response: AxiosResponse<BaseResponse<Receipt>> = await $api.post(`${apiDomain}/receipts`, dto)
    return response.data.data
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Ошибка создания прихода'
    throw new Error(message)
  }
}
