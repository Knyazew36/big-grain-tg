import { Page } from '@/components/Page'
import ButtonAction from '@/shared/button-action/ButtonAction'
import InputNumber from '@/shared/input-number/InputNumber'
import React from 'react'
import ProductsCard, { IProductsCard } from '../products/card/ProductsCard'

const data: IProductsCard[] = [
  {
    count: 3,
    min: 2,
    title: 'Поддоны',
    updatedAt: '1 day',
    ed: 'т'
  },
  {
    count: 3,
    min: 8,
    title: 'Чечевица',
    updatedAt: '1 day',
    ed: 'т'
  },
  {
    count: 3,
    min: 2,
    title: 'Пакеты',
    updatedAt: '1 day',
    ed: 'т'
  }
]
const ReportPage = () => {
  return (
    <Page back>
      <div className='max-w-sm space-y-3'>
        <input
          type='text'
          className='py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
          placeholder='Поиск товара...'
        />
      </div>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8'>
        {data.map(card => (
          <ProductsCard
            {...card}
            key={card.title}
          />
        ))}
      </div>

      <ButtonAction />
    </Page>
  )
}

export default ReportPage
