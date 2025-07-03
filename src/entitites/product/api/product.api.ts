// src/entities/product.api.ts
import { AxiosResponse } from 'axios'
import { $api, apiDomain, BaseResponse } from '@/shared/api'
import { Product } from '../model/product.type'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { hapticFeedback } from '@telegram-apps/sdk-react'

interface CreateProductDto {
  name: string
  quantity: number
  minThreshold: number
  unit?: string
  category?: string
  active?: boolean
}

type UpdateProductDto = Partial<CreateProductDto>

/**
 * Получить все товары
 */
// export const productGetAll = async ({ onlyActive }: { onlyActive?: boolean }): Promise<Product[]> => {
//   try {
//     const params = onlyActive !== undefined ? { onlyActive } : undefined
//     const response: AxiosResponse<BaseResponse<Product[]>> = await $api.get(`${apiDomain}/products`, { params })
//     return response.data.data
//   } catch (error: any) {
//     const message = error?.response?.data?.message || 'Ошибка загрузки товаров'
//     throw new Error(message)
//   }
// }

/**
 * Получить товар по ID
 */
// export const productGetById = async ({ id }: { id: number }): Promise<Product> => {
//   try {
//     const response: AxiosResponse<BaseResponse<Product>> = await $api.get(`${apiDomain}/products/${id}`)
//     return response.data.data
//   } catch (error: any) {
//     const message = error?.response?.data?.message || 'Ошибка загрузки товара'
//     throw new Error(message)
//   }
// }

/**
 * Создать новый товар
 */
// export const productCreate = async (dto: CreateProductDto): Promise<Product> => {
//   try {
//     const response: AxiosResponse<BaseResponse<Product>> = await $api.post(`${apiDomain}/products`, dto)
//     return response.data.data
//   } catch (error: any) {
//     const message = error?.response?.data?.message || 'Ошибка создания товара'
//     throw new Error(message)
//   }
// }

/**
 * Обновить существующий товар
 */
// export const productUpdate = async ({ id, dto }: { id: number; dto: UpdateProductDto }): Promise<Product> => {
//   try {
//     const response: AxiosResponse<BaseResponse<Product>> = await $api.post(`${apiDomain}/products/update/${id}`, dto)
//     return response.data.data
//   } catch (error: any) {
//     const message = error?.response?.data?.message || 'Ошибка обновления товара'
//     throw new Error(message)
//   }
// }

/**
 * Удалить товар
 */
// export const productDelete = async ({ id }: { id: number }): Promise<void> => {
//   try {
//     await $api.post(`${apiDomain}/products/delete/${id}`)
//   } catch (error: any) {
//     const message = error?.response?.data?.message || 'Ошибка удаления товара'
//     throw new Error(message)
//   }
// }

// src/hooks/useProductQuery.ts
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { $api, apiDomain } from '@/shared/api'
// import { Product } from '@/entitites/product/model/product.type'

// interface CreateProductDto {
//   name: string
//   quantity: number
//   minThreshold: number
//   unit?: string
//   category?: string
//   active?: boolean
// }

// type UpdateProductDto = Partial<CreateProductDto>

export const useProducts = (onlyActive?: boolean) => {
  return useQuery<Product[]>({
    queryKey: ['products', onlyActive],
    queryFn: async () => {
      const params = onlyActive !== undefined ? { onlyActive } : undefined
      const res = await $api.get(`${apiDomain}/products`, { params })
      return res.data.data
    }
  })
}

export const useProductById = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await $api.get(`${apiDomain}/products/${id}`)
      return res.data.data
    },
    enabled: !!id
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (dto: CreateProductDto) => {
      const res = await $api.post(`${apiDomain}/products`, dto)
      return res.data.data as Product
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      hapticFeedback.notificationOccurred('success')
    }
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, dto }: { id: number; dto: UpdateProductDto }) => {
      const res = await $api.post(`${apiDomain}/products/update/${id}`, dto)
      return res.data.data as Product
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      hapticFeedback.notificationOccurred('success')
    }
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      await $api.post(`${apiDomain}/products/delete/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      hapticFeedback.notificationOccurred('success')
    }
  })
}
