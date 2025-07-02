import { AxiosResponse } from 'axios'

import { $api, apiDomain, BaseResponse } from '@/shared/api'
import { Product } from '../model/product.type'

export const productGetAll = async ({ data }: { data: any }): Promise<Product[]> => {
  try {
    const response: AxiosResponse<BaseResponse<Product[]>> = await $api.post(`${apiDomain}/products`, data)
    return response.data.data
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Ошибка авторизации'
    throw new Error(message)
  }
}
