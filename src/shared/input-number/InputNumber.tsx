import React from 'react'

const InputNumber = () => {
  return (
    <div className='bg-white border border-gray-200 rounded-lg dark:bg-neutral-700 dark:border-neutral-700'>
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
    </div>
  )
}

export default InputNumber
