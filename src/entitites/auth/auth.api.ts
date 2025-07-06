import { AxiosResponse } from 'axios'
import { $api } from '@/shared/api' // ваш axios instance
import { apiDomain } from '@/shared/api/model/constants' // ваш базовый url
import { BaseResponse } from '@/shared/api'
import { IUser, Role } from '@/entitites/user/model/user.type'
import { AccessRequest, RequestAccessResponse } from './model/auth.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { hapticFeedback } from '@telegram-apps/sdk-react'

// login через Telegram initData
export const loginWithTelegram = async (initData: string): Promise<IUser> => {
  try {
    const response: AxiosResponse<BaseResponse<any>> = await $api.post(`${apiDomain}/auth/login`, { initData })
    return response.data.data
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Ошибка авторизации'
    throw new Error(message)
  }
}

// Тип ответа (можно адаптировать под ваш BaseResponse)

// export const requestAccess = async (telegramId: string): Promise<RequestAccessResponse> => {
//   try {
//     const response: AxiosResponse<RequestAccessResponse> = await $api.post(`${apiDomain}/auth/request-access`, { telegramId })
//     return response.data
//   } catch (error: any) {
//     const message = error?.response?.data?.message || 'Ошибка запроса доступа'
//     throw new Error(message)
//   }
// }
export const requestAccess = async (telegramId: string): Promise<RequestAccessResponse> => {
  try {
    const response: AxiosResponse<RequestAccessResponse> = await $api.post(`${apiDomain}/auth/access-request`, {
      telegramId
    })
    return response.data
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Ошибка запроса доступа'
    throw new Error(message)
  }
}

// получить все заявки
export const accessRequests = async (): Promise<{ user: IUser; processedBy: AccessRequest }[]> => {
  try {
    const response: AxiosResponse<BaseResponse<{ user: IUser; processedBy: AccessRequest }[]>> = await $api.post(
      `${apiDomain}/auth/access-requests`
    )
    return response.data.data
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Ошибка запроса доступа'
    throw new Error(message)
  }
}

export const useAccessRequests = (role: Role) => {
  return useQuery<AccessRequest[]>({
    queryKey: ['pending-access-requests'],
    queryFn: async () => {
      const res = await $api.post(`${apiDomain}/auth/pending-access-requests`)
      return res.data.data
    },
    retry: 3,
    retryDelay: 5000,
    enabled: role === Role.IT || role === Role.ADMIN || role === Role.OWNER
  })
}

// Хук для одобрения заявки на доступ
export const useApproveAccessRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      requestId,
      adminTelegramId,
      adminNote
    }: {
      requestId: number
      adminTelegramId: string
      adminNote?: string
    }) => {
      const res = await $api.post(`${apiDomain}/auth/approve-access-request`, {
        requestId,
        adminTelegramId,
        adminNote
      })
      return res.data
    },
    onSuccess: () => {
      // Инвалидируем кеш заявок, чтобы обновить список
      queryClient.invalidateQueries({ queryKey: ['pending-access-requests'] })
      hapticFeedback.notificationOccurred('success')
    },
    onError: error => {
      console.error('Error approving access request:', error)
      hapticFeedback.notificationOccurred('error')
    }
  })
}

// Хук для отклонения заявки на доступ
export const useDeclineAccessRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      requestId,
      adminTelegramId,
      adminNote
    }: {
      requestId: number
      adminTelegramId: string
      adminNote?: string
    }) => {
      const res = await $api.post(`${apiDomain}/auth/decline-access-request`, {
        requestId,
        adminTelegramId,
        adminNote
      })
      return res.data
    },
    onSuccess: () => {
      // Инвалидируем кеш заявок, чтобы обновить список
      queryClient.invalidateQueries({ queryKey: ['pending-access-requests'] })
      hapticFeedback.notificationOccurred('success')
    },
    onError: error => {
      console.error('Error declining access request:', error)
      hapticFeedback.notificationOccurred('error')
    }
  })
}
