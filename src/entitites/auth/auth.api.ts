import { AxiosResponse } from 'axios'
import { $api } from '@/shared/api' // ваш axios instance
import { apiDomain } from '@/shared/api/model/constants' // ваш базовый url
import { BaseResponse } from '@/shared/api'
import { IUser, Role } from '@/entitites/user/model/user.type'
import { AccessRequest, RequestAccessResponse } from './model/auth.type'
import { useQuery } from '@tanstack/react-query'

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
  return useQuery<{ user: IUser; processedBy: AccessRequest }[]>({
    queryKey: ['access-requests'],
    queryFn: async () => {
      const res = await $api.post(`${apiDomain}/auth/access-requests`)
      return res.data.data
    },
    retry: 3,
    retryDelay: 5000,
    enabled: role === Role.IT || role === Role.ADMIN || role === Role.OWNER
  })
}
