import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import InputNumber from '@/shared/input-number/InputNumber'
import React from 'react'

const ProductCreate = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className='p-4 group flex flex-col bg-white border border-gray-200 rounded-xl focus:outline-hidden dark:bg-neutral-900 dark:border-neutral-700'>
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить наименование товара</DialogTitle>
          <DialogDescription>Товар добавится в список, при этом наличие товара или его появление делается через поступление товара</DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-2'>
          <label>
            <div className='block mb-2 text-sm font-medium text-gray-800 dark:text-white'>Название</div>
            <input
              type='text'
              id='hs-pro-dalpn'
              className='py-2 sm:py-2.5 px-3 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600'
              placeholder='Товар'
            />
          </label>
          <label>
            <div className='block mb-2 text-sm font-medium text-gray-800 dark:text-white'>Минимальный остаток</div>
            {/* Input Number */}
            {/* <div className='bg-white border border-gray-200 rounded-lg dark:bg-neutral-700 dark:border-neutral-700'>
              <div className='w-full flex justify-between items-center gap-x-1'>
                <div className='grow py-2 px-3'>
                  <input
                    className='w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white'
                    // style='-moz-appearance: textfield;'
                    style={{ MozAppearance: 'textfield' }}
                    type='number'
                    aria-roledescription='Number field'
                    value='1123'
                    data-hs-input-number-input=''
                  />
                </div>
                <div className='flex items-center -gap-y-px divide-x divide-gray-200 border-s border-gray-200 dark:divide-neutral-700 dark:border-neutral-700'>
                  <button
                    type='button'
                    className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
                    aria-label='Decrease'
                    data-hs-input-number-decrement=''
                  >
                    <svg
                      className='shrink-0 size-3.5'
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
                      <path d='M5 12h14'></path>
                    </svg>
                  </button>
                  <button
                    type='button'
                    className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
                    aria-label='Increase'
                    data-hs-input-number-increment=''
                  >
                    <svg
                      className='shrink-0 size-3.5'
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
                      <path d='M5 12h14'></path>
                      <path d='M12 5v14'></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div> */}
            <InputNumber />
            {/* End Input Number */}
          </label>
        </div>
        <DialogFooter>
          <div className='flex-1 flex justify-end items-center gap-2'>
            <DialogClose asChild>
              <button
                type='button'
                className='py-2 px-3 text-nowrap inline-flex justify-center items-center text-start whitespace-nowrap bg-white border border-gray-200 text-gray-800 text-sm font-medium rounded-lg shadow-2xs align-middle hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
                data-hs-overlay='#hs-pro-dasadpm'
                aria-expanded='true'
              >
                Отмена
              </button>
            </DialogClose>

            <button
              type='button'
              className='py-2 px-3 text-nowrap inline-flex justify-center items-center gap-x-2 text-start whitespace-nowrap bg-blue-600 border border-blue-600 text-white text-sm font-medium rounded-lg shadow-2xs align-middle hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-500'
              data-hs-overlay='#hs-pro-dasadpm'
              aria-expanded='true'
            >
              Сохранить
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProductCreate
