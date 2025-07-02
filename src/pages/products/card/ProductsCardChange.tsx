import { Product } from '@/entitites/product/model/product.type'
import InputNumber from '@/shared/input-number/InputNumber'
import clsx from 'clsx'
import { FC } from 'react'
import ProductDelete from '../delete/ProductDelete'

export interface IProductsCard {
  value: number
  onChange: (value: number) => void
  data: Product
  withDelete?: boolean
}

const ProductsCardChange: FC<IProductsCard> = ({ data, withDelete, onChange, value }) => {
  return (
    <div
      className={clsx(
        'flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-800',
        data.quantity < data.minThreshold && '!border-red-500'
      )}
    >
      {withDelete && (
        <div>
          <ProductDelete
            productId={data.id}
            onSuccess={() => {
              window.location.reload()
            }}
          />
        </div>
      )}

      <div className='inline-flex justify-center items-center'>
        <span className={clsx('size-2 inline-block  rounded-full me-2', data.quantity < data.minThreshold ? 'bg-red-500' : 'bg-gray-500')} />
        <span className='text-xs font-semibold uppercase text-gray-600 dark:text-white'>{data.name}</span>
      </div>

      <div className='text-center'>
        <span className='block text-sm text-gray-500 dark:text-neutral-500'>остаток на складе</span>

        <h3 className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-neutral-200'>{`${data.quantity} ${
          data.unit ? data.unit : ''
        }`}</h3>
        <div className='flex flex-col gap-2 mt-4'>
          <span className='block text-sm text-gray-500 dark:text-neutral-500'>Израсходовано</span>

          <InputNumber
            onChange={onChange}
            value={value}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductsCardChange
