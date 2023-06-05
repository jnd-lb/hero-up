import React from 'react'

function AboutTheApp() {
  return (
    // <section className='bg-sky-500 relative'>
    //   <img src="/images/tilt.svg"  className="w-full " alt="" />
    //     <div className=' px-12 pb-10 pt-4 grid grid-cols-2'>
    //             <div className='flex flex-col justify-center'>
    //                 <h1 className='text-5xl font-black text-white w-2/4'>Introducing Demonds</h1>
    //                 <p className='mt-16 text-white'>Anim ad anim nulla culpa ea nisi sunt ut adipisicing qui ad. Labore culpa veniam laboris anim tempor pariatur id veniam. Fugiat ad nostrud est nisi aliquip esse officia ullamco occaecat quis.</p>
    //             </div>
    //             <div className=' h-96'>
    //                 <img className='w-80 left-2/4  bottom-0 absolute' src="/images/girl.png" alt="" />
    //             </div>
    //     </div>
    //   <img src="/images/tilt.svg"  className="w-full -scale-100 " alt="" />
    // </section>


    <section className="bg-sky-500 px-20 py-48 grid grid-cols-2  relative overflow-hidden">
      <img src="/images/tilt.svg" className="w-full absolute top-0 left-0" alt="" />

      <div className='flex flex-col justify-center'>
        <h1 className='text-5xl font-black text-white w-3/4'>Struggle Acheive Goals?</h1>
        <p className='mt-7 text-white'>Anim ad anim nulla culpa ea nisi sunt ut adipisicing qui ad. Labore culpa veniam laboris anim tempor pariatur id veniam. Fugiat ad nostrud est nisi aliquip esse officia ullamco occaecat quis.</p>
      </div>
      <div className=' h-96'>
        <img className='w-80 left-1/2 translate-x-1/2' src="/images/girl.png" alt="" />
      </div>

      <img src="/images/tilt.svg" className="w-full -scale-100 absolute bottom-0 left-0" alt="" />
    </section>
  )
}

export default AboutTheApp