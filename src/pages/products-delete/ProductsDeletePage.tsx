import { Page } from '@/components/Page'
import React, { useMemo, useState } from 'react'
import { useProducts, useUpdateProduct, useDeleteProduct } from '@/entitites/product/api/product.api'
import ProductsCardChange from '../products/card/ProductsCardChange'
import PageHeader from '@/shared/ui/page-header/ui/PageHeader'
import InputDefault from '@/shared/ui/input-default/ui/InputDefault'
import Loader from '@/shared/loader/ui/Loader'

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
    return <Loader />
  }

  return (
    <Page back>
      <div className='max-w-[85rem] py-10 pt-5 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        <PageHeader title='Редактирование товаров' />
        {/* Поиск товара */}
        <InputDefault
          value={searchTerm}
          onChange={setSearchTerm}
        />

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
