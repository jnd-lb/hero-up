import React from 'react'

function AboutUs() {
  return (
    <section className="px-36 py-16">
        <div className="grid grid-cols-3 gap-16">
            <div className='col-span-1 flex items-center'>
                <img src="/images/about-us.png" alt="" />
            </div>
            <div className='col-span-2'>
                <h1 className='text-3xl font-extrabold text-emerald-900'>About Us</h1>
                <h2 className='text-xl mt-2 font-thin '>The beggining of the journey</h2>

                <p className='text-gray-700 font-light mt-5'>Magna nisi ipsum cupidatat cupidatat occaecat aliquip. Occaecat id aliquip voluptate tempor magna occaecat sit commodo amet anim minim. Commodo tempor velit proident ad ut adipisicing adipisicing duis est fugiat cillum tempor. Do ea tempor quis esse labore occaecat et aliqua laborum. Magna dolore esse consequat do quis in ullamco nostrud qui. Quis exercitation qui elit minim proident enim ullamco nisi ipsum sit deserunt excepteur irure. Esse cupidatat elit consequat do in cillum occaecat mollit dolore culpa ut.</p>
            </div>
        </div>
    </section>
  )
}

export default AboutUs