import { Product } from '@/entitites/product/model/product.type'
import InputNumber from '@/shared/input-number/InputNumber'
import clsx from 'clsx'
import { FC } from 'react'
import ProductDelete from '../delete/ProductDelete'
import { Switch } from '@telegram-apps/telegram-ui'
import { useUpdateProduct } from '@/entitites/product/api/product.api'

export interface IProductsCard {
  value?: number
  onChange?: (value: number) => void
  data: Product
  withDelete?: boolean
  withSwitch?: boolean
  withInputNumber?: boolean
  min?: number
  max?: number
  isActive?: boolean
  onChangeCallback?: () => void
  onChangeActive?: (active: boolean) => void
}

const ProductsCardChange: FC<IProductsCard> = ({
  data,
  isActive = true,
  onChangeCallback,
  withDelete,
  withInputNumber,
  onChange,
  value,
  min,
  max,
  withSwitch,
  onChangeActive
}) => {
  const { mutate: updateProduct, isPending } = useUpdateProduct()

  const onSwitchChange = () => {
    updateProduct({ id: data.id, dto: { active: !data.active } })
  }
  return (
    <div
      className={clsx(
        'flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-800',
        data.quantity < data.minThreshold && '!border-red-500',
        !isActive && 'opacity-50 '
      )}
    >
      <div className='flex justify-between items-center'>
        {withDelete && (
          <div>
            <ProductDelete productId={data.id} />
          </div>
        )}

        {withSwitch && (
          <label className='relative inline-block w-11 h-6 cursor-pointer'>
            <input
              disabled={isPending}
              type='checkbox'
              className='peer sr-only'
              defaultChecked={data.active}
              onChange={onSwitchChange}
            />
            <span className='absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-green-600 dark:bg-neutral-700 dark:peer-checked:bg-green-500 peer-disabled:opacity-50 peer-disabled:pointer-events-none' />
            <span className='absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-neutral-400 dark:peer-checked:bg-white' />
          </label>
        )}
      </div>

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

          {withInputNumber && (
            <InputNumber
              onChange={onChange!}
              value={value!}
              min={min}
              max={max}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsCardChange
