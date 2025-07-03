// src/shared/input-number/InputNumber.tsx
import { hapticFeedback } from '@telegram-apps/sdk-react'
import React from 'react'

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** Значение поля */
  value: number
  /** Коллбек изменения значения */
  onChange: (value: number) => void
  /** Шаг инкремента/декремента */
  step?: number
  /** Минимальное значение */
  min?: number
  /** Максимальное значение */
  max?: number
}

const InputNumber: React.FC<InputNumberProps> = ({ value, onChange, step = 1, min, max, disabled, ...inputProps }) => {
  const handleDecrement = () => {
    const next = value - step
    if (min !== undefined && next < min) return
    onChange(next)
    hapticFeedback.impactOccurred('light')
  }

  const handleIncrement = () => {
    const next = value + step
    if (max !== undefined && next > max) return
    onChange(next)
    hapticFeedback.impactOccurred('light')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value === '' ? NaN : Number(e.target.value)
    if (isNaN(v)) {
      onChange(0)
    } else {
      if (min !== undefined && v < min) {
        onChange(min)
      } else if (max !== undefined && v > max) {
        onChange(max)
      } else {
        onChange(v)
      }
    }
  }

  return (
    <div className='bg-white border border-gray-200 rounded-lg dark:bg-neutral-700 dark:border-neutral-700'>
      <div className='w-full flex justify-between items-center gap-x-1'>
        <div className='grow py-2 px-3'>
          <input
            {...inputProps}
            type='number'
            aria-roledescription='Number field'
            className='w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white'
            style={{ MozAppearance: 'textfield' }}
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
        <div className='flex items-center -gap-y-px divide-x divide-gray-200 border-s border-gray-200 dark:divide-neutral-700 dark:border-neutral-700'>
          <button
            type='button'
            onClick={handleDecrement}
            disabled={disabled || (min !== undefined && value <= min)}
            className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
            aria-label='Decrease'
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
              <path d='M5 12h14' />
            </svg>
          </button>
          <button
            type='button'
            onClick={handleIncrement}
            disabled={disabled || (max !== undefined && value >= max)}
            className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
            aria-label='Increase'
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
              <path d='M5 12h14' />
              <path d='M12 5v14' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputNumber
