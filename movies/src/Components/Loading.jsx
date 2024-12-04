import React from 'react'
import loader from '../../public/loader.gif'

function Loading() {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-white'>
      <img className='w-28 h-28' src={loader} alt="" />
    </div>
  )
}

export default Loading
