import React from 'react'
import { PulseLoader } from 'react-spinners'
const Spinner = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black'>
      <PulseLoader
        color='#ffffff'
        size={10}
      />
    </div>
  )
}

export default Spinner
