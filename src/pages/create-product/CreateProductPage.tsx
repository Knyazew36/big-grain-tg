import { Page } from '@/components/Page'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import InputNumber from '@/shared/input-number/InputNumber'
import { useNavigate } from 'react-router-dom'
import { hapticFeedback, showPopupError } from '@telegram-apps/sdk-react'
import ButtonAction from '@/shared/button-action/ButtonAction'
import { useCreateProduct } from '@/entitites/product/api/product.api'
import { useBottomSheetStore } from '@/shared/bottom-sheet/model/store.bottom-sheet'
import { Modal } from '@telegram-apps/telegram-ui'

type FormValues = {
  name: string
  minThreshold: number
  unit: string
  quantity: number
}
const CreateProductPage = () => {
  const navigate = useNavigate()
  const { open } = useBottomSheetStore()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: { name: '', minThreshold: 0 }
  })
  const { mutateAsync: createProduct } = useCreateProduct()
  const onSubmit = async (data: FormValues) => {
    try {
      await createProduct({
        name: data.name,
        quantity: data.quantity || 0,
        minThreshold: data.minThreshold,
        unit: data.unit
      })

      open({
        isOpen: true,
        description: 'Товар успешно создан'
      })
      reset()
    } catch (e: any) {
      hapticFeedback.notificationOccurred('error')
      reset()
    }
  }
  return (
    <Page back>
      <>
        {/* Add Card Form */}
        <div className='bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700'>
          {/* Header */}
          <div className='py-2.5 px-4 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700'>
            <h3 className='font-medium text-gray-800 dark:text-neutral-200'>Создать продукт</h3>
          </div>
          {/* End Header */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Body */}
            <div className='p-4 space-y-5 gap-2 flex flex-col'>
              <label>
                <div className='block mb-2 text-sm font-medium text-gray-800 dark:text-white'>Название</div>
                <input
                  {...register('name', { required: 'Название обязательно' })}
                  type='text'
                  id='hs-pro-dalpn'
                  className='py-2 sm:py-2.5 px-3 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600'
                  placeholder='Товар'
                />
                {errors.name && <p className='mt-1 text-xs text-red-500'>{errors.name.message}</p>}
              </label>

              <label>
                <div className='block mb-2 text-sm font-medium text-gray-800 dark:text-white'>Сейчас на складе</div>
                <Controller
                  control={control}
                  name='quantity'
                  rules={{
                    min: { value: 0, message: 'Не может быть меньше 0' }
                  }}
                  render={({ field }) => (
                    <div className='bg-white border border-gray-200 rounded-lg dark:bg-neutral-700 dark:border-neutral-700'>
                      <InputNumber {...field} />
                    </div>
                  )}
                />
                {errors.minThreshold && <p className='mt-1 text-xs text-red-500'>{errors.minThreshold.message}</p>}
              </label>

              <label>
                <div className='block mb-2 text-sm font-medium text-gray-800 dark:text-white'>Единица измерения</div>
                <input
                  {...register('unit')}
                  type='text'
                  defaultValue='ед'
                  id='hs-pro-dalpn'
                  className='py-2 sm:py-2.5 px-3 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600'
                  placeholder='Товар'
                />
                {errors.unit && <p className='mt-1 text-xs text-red-500'>{errors.unit.message}</p>}
              </label>
              <label>
                <div className='block mb-2 text-sm font-medium text-gray-800 dark:text-white'>Минимальный остаток</div>
                <Controller
                  control={control}
                  name='minThreshold'
                  rules={{
                    required: 'Мин. остаток обязателен',
                    min: { value: 0, message: 'Не может быть меньше 0' }
                  }}
                  render={({ field }) => (
                    <div className='bg-white border border-gray-200 rounded-lg dark:bg-neutral-700 dark:border-neutral-700'>
                      <InputNumber {...field} />
                    </div>
                  )}
                />
                {errors.minThreshold && <p className='mt-1 text-xs text-red-500'>{errors.minThreshold.message}</p>}
              </label>
            </div>
            {/* End Body */}
          </form>
        </div>
        <ButtonAction
          onSuccessClick={handleSubmit(onSubmit)}
          onCancelClick={() => {
            reset()
          }}
        />
        {/* End Add Card Form */}
      </>
    </Page>
  )
}

export default CreateProductPage
