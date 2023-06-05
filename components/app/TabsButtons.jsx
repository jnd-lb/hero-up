import { useContextAPI } from '@/ContextAPI'
import React from 'react'

function TabsButtons() {
    const {setSelectedTab,selectedTab} = useContextAPI()
  return (
    <div className="p-1 py-3 rounded-3xl shadow-xl drop-shadow-lg flex gap-9 mx-auto w-fit fixed left-1/2 -translate-x-1/2 bottom-10 z-50 bg-white">
        <button onClick={()=>setSelectedTab('PILLARS')} className={`flex justify-center items-center gap-2 w-36  px-5 rounded-full hover:text-amber-400 transition-all ${selectedTab=="PILLARS"?"text-amber-500":"text-gray-400"}`}>
            <i className="bi bi-bank text-lg flex items-center m-0 p-0"></i>
            <span className="">Pillars</span>
        </button>


        <button onClick={()=>setSelectedTab('GOALS')} className={`flex justify-center items-center gap-2 w-36  px-5 rounded-full hover:text-amber-400 transition-all ${selectedTab=="GOALS"?"text-amber-500":"text-gray-400"}`}>
            <i className="bi bi-compass text-lg flex items-center m-0 p-0"></i>
            <span className="">Goals</span>
        </button>

        <button onClick={()=>setSelectedTab('MISSIONS')} className={`flex justify-center items-center gap-2 w-36  px-5 rounded-full hover:text-amber-400 transition-all ${selectedTab=="MISSIONS"?"text-amber-500":"text-gray-400"}`}>
            <i className="bi bi-list-task text-lg flex items-center m-0 p-0"></i>
            <span className="">Missions</span>
        </button>

        
    </div>
  )
}

export default TabsButtons