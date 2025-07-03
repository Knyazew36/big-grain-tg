import { Page } from '@/components/Page'
import React from 'react'
import { useStatistics } from '@/entitites/receipt/api/receipt.api'
import Spinner from '@/shared/spinner/Spinner'

const IncomingStatistics = () => {
  const { data, isLoading } = useStatistics()

  if (isLoading) return <Spinner />
  return (
    <Page back>
      {data?.data.map(item => (
        <div key={item.date}>
          <h1>{item.date}</h1>
          <h1>{item.user?.username}</h1>
          <h1>{item.products.map(product => product.product?.name).join(', ')}</h1>
        </div>
      ))}
    </Page>
  )
}

export default IncomingStatistics
