import { Page } from '@/components/Page'
import ButtonAction from '@/shared/button-action/ButtonAction'
import React, { useEffect, useMemo, useState } from 'react'
import ProductsCardChange from '../products/card/ProductsCardChange'
import { productGetAll } from '@/entitites/product/api/product.api'
import { Product } from '@/entitites/product/model/product.type'
import Spinner from '@/shared/spinner/Spinner'
import { receiptCreate } from '@/entitites/receipt/api/receipt.api'

const IncomingPage = () => {
  const [data, setData] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [arrivals, setArrivals] = useState<{ [productId: number]: number }>({})

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await productGetAll({})
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

  const handleArrivalChange = (productId: number, value: number) => {
    const validatedValue = Math.max(0, value)
    setArrivals(prev => ({ ...prev, [productId]: validatedValue }))
  }

  const handleCancel = () => {
    const reset: { [productId: number]: number } = {}
    data.forEach(product => {
      reset[product.id] = 0
    })
    setArrivals(reset)
  }

  const onSubmit = async () => {
    const payload = Object.entries(arrivals)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({
        productId: Number(productId),
        quantity: Number(quantity)
      }))
    for (const dto of payload) {
      await receiptCreate(dto)
    }
    await getData()
    handleCancel()
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Page back>
      <div className='flex flex-col flex-1'>
        <div className=' space-y-3'>
          <input
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
            placeholder='Поиск товара...'
          />
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8'>
          {filteredData.length > 0 ? (
            filteredData.map(card => (
              <ProductsCardChange
                value={arrivals[card.id] || 0}
                onChange={value => handleArrivalChange(card.id, value)}
                key={card.id}
                data={card}
                min={0}
                max={undefined}
              />
            ))
          ) : (
            <p className='col-span-full text-center text-muted-foreground'>Товары не найдены</p>
          )}
        </div>

        <ButtonAction
          onSuccessClick={onSubmit}
          onCancelClick={handleCancel}
        />
      </div>
    </Page>
  )
}

export default IncomingPage
