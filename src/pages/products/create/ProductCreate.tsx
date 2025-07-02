// src/features/products/ProductCreate.tsx
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import InputNumber from '@/shared/input-number/InputNumber'
import { productCreate } from '@/entitites/product/api/product.api'

type FormValues = {
  name: string
  minThreshold: number
}

interface ProductCreateProps {
  onSuccess?: () => void
}

const ProductCreate: React.FC<ProductCreateProps> = ({ onSuccess }) => {
  const [open, setOpen] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: { name: '', minThreshold: 0 }
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await productCreate({
        name: data.name,
        quantity: 0,
        minThreshold: data.minThreshold
      })
      reset()
      setOpen(false)
      onSuccess?.()
    } catch (e: any) {
      alert(e.message || 'Ошибка при создании товара')
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <button className='p-4 group flex flex-col bg-white border border-gray-200 rounded-xl focus:outline-hidden dark:bg-neutral-900 dark:border-neutral-700 '>
          <div className='mb-4 flex flex-col justify-center items-center h-full'>
            <span className='flex justify-center items-center size-12 xl:size-16 mx-auto border-2 border-dotted border-gray-300 text-gray-400 rounded-2xl dark:border-neutral-700 dark:text-neutral-500'>
              <svg
                className='shrink-0 size-5'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M5 12h14' />
                <path d='M12 5v14' />
              </svg>
            </span>
          </div>
          <div className='text-center mt-auto'>
            <p className='truncate text-xs xl:text-sm font-medium text-gray-800 group-hover:text-pink-600 group-focus:text-pink-600 dark:text-neutral-200 dark:group-hover:text-neutral-400 dark:group-focus:text-neutral-400'>
              Добавить продукт
            </p>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Добавить наименование товара</DialogTitle>
          <DialogDescription>Товар добавится в список, при этом наличие товара или его появление делается через поступление товара</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-2'
        >
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

          <DialogFooter>
            <div className='flex-1 flex justify-end items-center gap-2'>
              <DialogClose asChild>
                <button
                  type='button'
                  className='py-2 px-3 text-nowrap inline-flex justify-center items-center text-start whitespace-nowrap bg-white border border-gray-200 text-gray-800 text-sm font-medium rounded-lg shadow-2xs align-middle hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
                >
                  Отмена
                </button>
              </DialogClose>
              <button
                type='submit'
                disabled={isSubmitting}
                className='py-2 px-3 text-nowrap inline-flex justify-center items-center gap-x-2 text-start whitespace-nowrap bg-blue-600 border border-blue-600 text-white text-sm font-medium rounded-lg shadow-2xs align-middle hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-500'
              >
                {isSubmitting ? 'Сохранение…' : 'Сохранить'}
              </button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ProductCreate
