import React from 'react'

function Loading() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-opacity-75  backdrop-blur-md bg-black flex items-center justify-center flex-col gap-5">
        <div class="lds-hourglass"></div>
        <h1 className='text-white'>Please wait...</h1>
    </div>
  )
}

export default Loading