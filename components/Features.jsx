import React from 'react'
import FeatureCard from './FeatureCard'

function Features() {
    return (
        <section className='px-20 py-10' >
            <span className='hidden bg-sky-500 bg-sky-400 bg-amber-500 bg-amber-400 bg-lime-500 bg-lime-400'> Force load classes</span>
            <h1 className='text-5xl font-black   text-slate-900 w-2/4'>Introducing Demonds</h1>
            <p className='mt-4 text-slate-900 w-2/4'>Anim ad anim nulla culpa ea nisi sunt ut adipisicing qui ad. Labore culpa veniam laboris anim tempor pariatur id </p>
       
            <div className='grid grid-cols-3 gap-36 mt-20'>
                <FeatureCard index={1} background={"bg-amber"} title="Pillars"/>
                <FeatureCard index={0} background={"bg-sky"} title="Goals"/>
                <FeatureCard index={2} background={"bg-lime"} title="Missions"/>
            </div>
        </section>
    )
}

export default Features