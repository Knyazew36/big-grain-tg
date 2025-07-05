import { Page } from '@/components/Page'
import React, { Fragment } from 'react'
import { useStatistics } from '@/entitites/receipt/api/receipt.api'
import Spinner from '@/shared/spinner/Spinner'
import PageHeader from '@/shared/ui/page-header/ui/PageHeader'

const IncomingStatistics = () => {
  const { data, isLoading } = useStatistics()

  if (isLoading) return <Spinner />
  return (
    <Page back>
      <PageHeader title='Расход и поступление' />
      <div className='flex flex-col gap-2'>
        {data?.data.map(item => (
          <div
            key={item.date}
            className='bg-white border border-gray-200 rounded-2xl dark:bg-neutral-900 dark:border-neutral-700'
          >
            {/* Heading */}
            <div className='py-3 px-4 border-b border-gray-200 dark:border-neutral-700'>
              <h2 className='font-medium text-gray-800 dark:text-neutral-200'>
                {new Date(item.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </h2>
            </div>
            {/* End Heading */}
            {/* Body */}
            <div className='p-4'>
              {/* List */}
              <dl className='grid grid-cols-1 sm:grid-cols-2 sm:gap-y-2 gap-x-4'>
                <dt className='sm:py-1 text-sm text-gray-500 dark:text-neutral-500'>Тип:</dt>
                <dd className='pb-3 sm:py-1 min-h-8 text-sm text-gray-800 dark:text-neutral-200'>
                  {item.type === 'income' ? (
                    <div className='hs-tooltip inline-block'>
                      <span className='hs-tooltip-toggle py-1 px-2.5 inline-flex items-center gap-x-2.5 bg-green-100 text-green-700 text-start text-nowrap font-medium text-[13px] rounded-full dark:bg-green-500/10 dark:text-green-400'>
                        <span className='relative w-2.5 h-px bg-green-700 after:absolute after:top-1/2 after:-end-1 after:size-1.5 after:bg-green-700 after:rounded-full after:-translate-y-1/2 dark:bg-green-400 dark:after:bg-green-400' />
                        Поступление
                      </span>
                    </div>
                  ) : (
                    <div className='hs-tooltip inline-block'>
                      <span className='hs-tooltip-toggle py-1 px-2.5 inline-flex items-center gap-x-2.5 bg-red-100 text-red-700 text-start text-nowrap font-medium text-[13px] rounded-full dark:bg-red-500/10 dark:text-red-400'>
                        <span className='relative w-2.5 h-px bg-red-700 after:absolute after:top-1/2 after:-start-1 after:size-1.5 after:bg-red-700 after:rounded-full after:-translate-y-1/2 dark:bg-red-400 dark:after:bg-red-400' />
                        Расход
                      </span>
                    </div>
                  )}
                </dd>

                {item.user?.username && (
                  <>
                    <dt className='sm:py-1 text-sm text-gray-500 dark:text-neutral-500'>Выполнил:</dt>
                    <dd className='pb-3 sm:py-1 min-h-8 text-sm text-gray-800 dark:text-neutral-200'>{item.user?.username}</dd>
                  </>
                )}

                {item.products.map(product => (
                  <Fragment key={product.product?.id}>
                    <dt className='sm:py-1 text-sm text-gray-500 dark:text-neutral-500'>{product.product?.name}</dt>
                    <dd className='pb-3 sm:py-1 min-h-8 text-sm text-gray-800 dark:text-neutral-200'>
                      {product.quantity} {product.product?.unit}
                    </dd>
                  </Fragment>
                ))}
              </dl>
              {/* End List */}
            </div>
            {/* End Body */}
          </div>
        ))}

        <>
          {/* Card */}

          {/* End Card */}
        </>
      </div>
    </Page>
  )
}

export default IncomingStatistics
