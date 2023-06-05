import React from 'react'

function SideDecoration() {
  return (
    <>
     <h1 className='text-5xl mb-9 font-black text-slate-900 mx-auto w-fit relative z-40'>Welcome To Hero Up</h1>
                <img className="absolute top-12 w-3/4 left-1/2 -translate-x-1/2 " src="/images/hero-bg.svg" alt="" />
                <img className=' animate-float	relative w-3/4 mx-auto' src="/images/superhero.png" alt="" />
    </>
  )
}

export default SideDecoration