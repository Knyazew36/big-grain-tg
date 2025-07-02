import { Page } from '@/components/Page'
import React from 'react'
import ProductsCard, { IProductsCard } from './card/ProductsCard'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { LucideMailWarning, Terminal } from 'lucide-react'
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

export const ProductsPage = () => {
  return (
    <Page back>
      {/* Card Section */}
      <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        <div className='max-w-sm space-y-3'>
          <input
            type='text'
            className='py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
            placeholder='Поиск товара...'
          />
        </div>

        <Alert
          variant='destructive'
          className='mt-4'
        >
          <LucideMailWarning />
          <AlertTitle>Внимание!</AlertTitle>
          <AlertDescription>На складе заканичвается чечевица</AlertDescription>
        </Alert>

        {/* Grid */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8'>
          {data.map(card => (
            <ProductsCard
              {...card}
              key={card.title}
            />
          ))}
        </div>
        {/* End Grid */}
      </div>
      {/* End Card Section */}
    </Page>
  )
}
