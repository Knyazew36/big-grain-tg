import { Page } from '@/components/Page'
import React from 'react'
import ProductCreate from '../products/create/ProductCreate'

const SettingsPage = () => {
  return (
    <Page>
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-2 lg:gap-4 mt-8'>
        <ProductCreate />
      </div>
    </Page>
  )
}

export default SettingsPage
