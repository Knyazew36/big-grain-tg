import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

const ProductCreate = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button
          type='button'
          className='py-2 px-3.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:ring-2 focus:ring-blue-500'
        >
          <svg
            className='shrink-0 size-3'
            xmlns='http://www.w3.org/2000/svg'
            width={16}
            height={16}
            fill='currentColor'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 1C8.55228 1 9 1.44772 9 2V7L14 7C14.5523 7 15 7.44771 15 8C15 8.55228 14.5523 9 14 9L9 9V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V9.00001L2 9.00001C1.44772 9.00001 1 8.5523 1 8.00001C0.999999 7.44773 1.44771 7.00001 2 7.00001L7 7.00001V2C7 1.44772 7.44772 1 8 1Z'
            />
          </svg>
          Создать товар
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить наименование товара</DialogTitle>
          <DialogDescription>Товар добавится в список, при этом наличие товара или его появление делается через поступление товара</DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-2'>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-800 dark:text-white'>Название</label>
            <input
              type='text'
              id='hs-pro-dalpn'
              className='py-2 sm:py-2.5 px-3 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600'
              placeholder='Товар'
            />
          </div>
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
