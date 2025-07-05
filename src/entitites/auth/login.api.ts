import { AxiosResponse } from 'axios'
import { $api } from '@/shared/api' // ваш axios instance
import { apiDomain } from '@/shared/api/model/constants' // ваш базовый url
import { BaseResponse } from '@/shared/api'
import { IUser } from '@/entitites/user/model/user.type'
import { RequestAccessResponse } from './model/auth.type'

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

export const requestAccess = async (telegramId: string): Promise<RequestAccessResponse> => {
  try {
    const response: AxiosResponse<RequestAccessResponse> = await $api.post(`${apiDomain}/auth/request-access`, { telegramId })
    return response.data
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Ошибка запроса доступа'
    throw new Error(message)
  }
}
