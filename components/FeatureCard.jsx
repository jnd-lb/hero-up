import React from 'react'

function FeatureCard({title="Feature",background="bg-sky-500", index=0}) {
  return (
    <div  data-aos="fade-up"  data-aos-duration="1500" data-aos-delay={150*index}  className={`${background}-400 rounded overflow-hidden  shadow-lg`}>
        <div className={`w-full ${background}-500 p-4 px-5 flex gap-5 items-center`}>
        <i className="bi bi-graph-up text-white text-xl"></i>
            <h1 className="text-lg font-black text-white">{title}</h1>
        </div>
        
        <div className="p-4 px-5">
            <p className="text-white font-light">Dolore ex non ea eu aliquip consequat consequat aliquip officia ea laboris esse voluptate.</p>
        </div>
    </div>
  )
}

export default FeatureCard