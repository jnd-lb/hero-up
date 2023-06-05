import Link from 'next/link'
import React from 'react'

function FloatingButton({label,link="", onClick}) {
  return (
    <Link href={link} onClick={onClick} className={` ${false?'bottom-20':'bottom-10'} flex items-center justify-center rounded-full bg-sky-500 aspect-square h-14 font-black text-2xl text-white fixed z-50 shadow-xl   right-16`}>{label}</Link>
  )
}

export default FloatingButton