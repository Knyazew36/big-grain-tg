import { AxiosResponse } from 'axios'
import { $api } from '@/shared/api' // ваш axios instance
import { apiDomain } from '@/shared/api/model/constants' // ваш базовый url
import { BaseResponse } from '@/shared/api'
import { Receipt, StatisticsResponse } from '../model/receipt.type'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Product } from '@/entitites/product/model/product.type'

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
// const januaryStats = await getReceiptsStatistics('2024-01-01', '2024-01-31');
// Если ваш API возвращает данные в формате BaseResponse
// export const getReceiptsStatistics = async (start?: string, end?: string): Promise<StatisticsResponse> => {
//   try {
//     const params = new URLSearchParams()
//     if (start) params.append('start', start)
//     if (end) params.append('end', end)

//     const queryString = params.toString() ? `?${params.toString()}` : ''
//     const response: AxiosResponse<BaseResponse<StatisticsResponse>> = await $api.get(`${apiDomain}/receipts/statistics${queryString}`)

//     return response.data.data
//   } catch (error: any) {
//     const message = error?.response?.data?.message || 'Ошибка получения статистики'
//     throw new Error(message)
//   }
// }

// // export const useStatistics = (start?: string, end?: string) => {
// //   const [startDate, setStartDate] = useState<string | undefined>(start)
// //   const [endDate, setEndDate] = useState<string | undefined>(end)
// //   return useQuery<StatisticsResponse>({
// //     queryKey: ['statistics', start, end],
// //     queryFn: async () => {
// //       const res = await getReceiptsStatistics(startDate, endDate)
// //       return res
// //     }
// //   })
// // }

export const useStatistics = (start?: string, end?: string) => {
  return useQuery<StatisticsResponse>({
    queryKey: ['statistics', start, end],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (start) params.append('start', start)
      if (end) params.append('end', end)

      const queryString = params.toString() ? `?${params.toString()}` : ''
      const response: AxiosResponse<BaseResponse<StatisticsResponse>> = await $api.get(`${apiDomain}/receipts/statistics${queryString}`)

      return response.data.data
    }
  })
}
