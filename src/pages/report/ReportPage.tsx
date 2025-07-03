import { Page } from '@/components/Page'
import ButtonAction from '@/shared/button-action/ButtonAction'
import React, { useEffect, useMemo, useState } from 'react'
import ProductsCard, { IProductsCard } from '../products/card/ProductsCard'

import { Product } from '@/entitites/product/model/product.type'
import Spinner from '@/shared/spinner/Spinner'
import ProductsCardChange from '../products/card/ProductsCardChange'
import { shiftCreate } from '@/entitites/shift/api/shift.api'
import { hapticFeedback } from '@telegram-apps/sdk-react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '@/entitites/product/api/product.api'
import { useBottomSheetStore } from '@/shared/bottom-sheet/model/store.bottom-sheet'
const ReportPage = () => {
  const navigate = useNavigate()
  const { data = [], isLoading } = useProducts(true)
  const { open } = useBottomSheetStore()

  const [searchTerm, setSearchTerm] = useState('')
  const [consumptions, setConsumptions] = useState<{ [productId: number]: number }>({})

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return data
    return data.filter(item => item.name.toLowerCase().includes(term))
  }, [data, searchTerm])

  const handleConsumptionChange = (productId: number, value: number) => {
    const product = data.find(p => p.id === productId)
    if (!product) return
    const validatedValue = Math.max(0, Math.min(value, product.quantity))
    setConsumptions(prev => ({ ...prev, [productId]: validatedValue }))
  }

  const handleCancel = () => {
    const reset: { [productId: number]: number } = {}
    data.forEach(product => {
      reset[product.id] = 0
    })
    setConsumptions(reset)
  }

  const onSubmit = async () => {
    const payload = {
      consumptions: Object.entries(consumptions)
        .filter(([_, consumed]) => consumed > 0)
        .map(([productId, consumed]) => ({
          productId: Number(productId),
          consumed: Number(consumed)
        }))
    }
    try {
      await shiftCreate(payload.consumptions)
      open({
        isOpen: true,
        description: 'Отчет успешно отправлен'
      })
      navigate(-1)
    } catch (error) {}
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
                value={consumptions[card.id] || 0}
                onChange={value => handleConsumptionChange(card.id, value)}
                withInputNumber
                key={card.id}
                data={card}
                min={0}
                max={card.quantity}
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

export default ReportPage
