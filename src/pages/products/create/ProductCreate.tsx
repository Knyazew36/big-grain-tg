import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { hapticFeedback } from '@telegram-apps/sdk-react'

const ProductCreate: React.FC = () => {
  return (
    <Link
      to={'/create-product'}
      onClick={() => hapticFeedback.impactOccurred('rigid')}
      className='p-4 group flex flex-col bg-white border border-gray-200 rounded-xl focus:outline-hidden dark:bg-neutral-900 dark:border-neutral-700 '
    >
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
          Создать продукт
        </p>
      </div>
    </Link>
  )
}

export default ProductCreate
