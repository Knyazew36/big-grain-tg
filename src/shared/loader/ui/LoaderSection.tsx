import Spinner from '@/shared/spinner/Spinner'
import React from 'react'

const LoaderSection = () => {
  return (
    <div className='absolute inset-0 flex justify-center items-center bg-black/50 z-50'>
      <Spinner />
    </div>
  )
}

export default LoaderSection
