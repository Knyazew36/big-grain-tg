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
import PageHeader from '@/shared/ui/page-header/ui/PageHeader'
import InputDefault from '@/shared/ui/input-default/ui/InputDefault'
import ErrorText from '@/shared/ui/error-text/ui/ErrorText'

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
    formState: { errors, isSubmitting, isValid }
  } = useForm<FormValues>({
    defaultValues: { name: '', minThreshold: 0, quantity: 0, unit: 'ед' }
  })
  const { mutateAsync: createProduct } = useCreateProduct()
  const onSubmit = async (data: FormValues) => {
    try {
      await createProduct({
        name: data.name,
        quantity: data.quantity || 0,
        minThreshold: data.minThreshold || 0,
        unit: data.unit || 'ед'
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
      <PageHeader title='Создать товар' />

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Body */}
        <div className=' space-y-5 gap-2 flex flex-col'>
          <label>
            <div className='block mb-2 text-sm font-medium text-gray-800 dark:text-white'>Название</div>
            <Controller
              control={control}
              name='name'
              rules={{ required: 'Название обязательно' }}
              render={({ field }) => (
                <InputDefault
                  {...field}
                  placeholder='Товар'
                  error={errors.name?.message}
                />
              )}
            />
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

            <Controller
              control={control}
              name='unit'
              rules={{ required: 'Единица измерения обязательна' }}
              render={({ field }) => (
                <InputDefault
                  {...field}
                  placeholder='Единица измерения'
                  error={errors.unit?.message}
                />
              )}
            />
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
      <ButtonAction
        onSuccessClick={handleSubmit(onSubmit)}
        onCancelClick={() => {
          reset()
        }}
      />
    </Page>
  )
}

export default CreateProductPage
