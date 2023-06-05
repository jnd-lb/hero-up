import Link from 'next/link'
import React from 'react'

function HeroSection() {
  return (
    <section className="hero-section px-12 pt-10 pb-0">
        <div className="grid grid-cols-2">
            <div className='relative py-16'>
                <img className="absolute top-0 w-4/5 left-1/2 -translate-x-1/2 " src="/images/hero-bg.svg" alt="" />
                <img className=' animate-float	 relative w-3/4 mx-auto' src="/images/superhero.png" alt="" />
            </div>
            <div className="p-10 flex flex-col justify-center">
                <h1 className="text-5xl font-black text-slate-900">Become Your <span className="text-amber-500">Hero</span></h1>
                <h2 className='text-3xl mt-2'></h2>

                <p className="mt-4 text-slate-900">Mollit velit sint do ex est incididunt voluptate irure nostrud eu.</p>
                <Link className="py-3 px-9  bg-amber-500 text-white rounded-full mt-7 block w-fit hover:scale-110 transition-all" href="/login">Join now free</Link>
            </div>
        </div>
    </section>
  )
}

export default HeroSection