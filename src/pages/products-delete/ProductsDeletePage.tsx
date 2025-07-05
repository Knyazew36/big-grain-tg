import { Page } from '@/components/Page'
import React, { useMemo, useState } from 'react'
import { useProducts, useUpdateProduct, useDeleteProduct } from '@/entitites/product/api/product.api'
import Spinner from '@/shared/spinner/Spinner'
import AlertProductLowStock from '@/widgets/alert-product-low-stock/AlertProductLowStock'
import ProductsCardChange from '../products/card/ProductsCardChange'
import Breadcrumbs from '@/shared/ui/breadcrumbs/ui/Breadcrumbs'
import PageHeader from '@/shared/ui/page-header/ui/PageHeader'

export const ProductsDeletePage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { data = [], isLoading } = useProducts(false)

  const { mutate: updateProduct } = useUpdateProduct()

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
      <div className='max-w-[85rem] py-10 pt-5 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        <PageHeader title='Редактирование товаров' />
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
              <ProductsCardChange
                withSwitch
                withDelete
                key={card.id}
                data={card}
                isActive={card.active}
                onChangeActive={active => updateProduct({ id: card.id, dto: { active } })}
              />
            ))
          ) : (
            <p className='col-span-full text-center text-muted-foreground'>Товары не найдены</p>
          )}
        </div>
      </div>
    </Page>
  )
}
