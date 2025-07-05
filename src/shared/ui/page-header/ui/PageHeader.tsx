import React from 'react'

interface IPageHeader {
  title: string
}

const PageHeader = ({ title }: IPageHeader) => {
  return (
    <div className='flex justify-between  gap-x-5 flex-col border-b border-gray-200 dark:border-neutral-700 pb-4 mb-8'>
      <h2 className='block font-bold text-lg sm:text-xl text-gray-800 dark:text-neutral-200'>{title}</h2>
    </div>
  )
}

export default PageHeader
