import { Page } from '@/components/Page'
import React, { useEffect, useState, useMemo } from 'react'
import ProductsCard from './card/ProductsCard'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { LucideMailWarning } from 'lucide-react'
import ProductCreate from './create/ProductCreate'
import { productGetAll } from '@/entitites/product/api/product.api'
import { Product } from '@/entitites/product/model/product.type'
import Spinner from '@/shared/spinner/Spinner'
import AlertProductLowStock from '@/widgets/alert-product-low-stock/AlertProductLowStock'

export const ProductsPage = () => {
  const [data, setData] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await productGetAll({ onlyActive: true })
      if (res) {
        setData(res)
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Ошибка загрузки данных'
      console.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return data
    return data.filter(item => item.name.toLowerCase().includes(term))
  }, [data, searchTerm])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Page back>
      <div className='max-w-[85rem] py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        {/* Поиск товара */}
        <div className=' space-y-3'>
          <input
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
            placeholder='Поиск товара...'
          />
        </div>

        <AlertProductLowStock />

        {/* Сетка товаров */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8'>
          {filteredData.length > 0 ? (
            filteredData.map(card => (
              <ProductsCard
                key={card.id}
                data={card}
              />
            ))
          ) : (
            <p className='col-span-full text-center text-muted-foreground'>Товары не найдены</p>
          )}
        </div>

        {/* Кнопка создания нового товара */}
        <div className='mt-8'>
          <ProductCreate />
        </div>
      </div>
    </Page>
  )
}
