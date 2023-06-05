import React, {useState,useEffect} from 'react'
import TabsButtons from './TabsButtons'
import Missions from './mission/Missions'
import Pillars from './pillar/Pillars'
import Goals from './goal/Goals'
import { useContextAPI } from '@/ContextAPI'
import Timer from './Timer'

function App() {
const {setSelectedTab,selectedTab,activeComponent,setActiveComponent} = useContextAPI()

  const conponentsList = {
    "MISSIONS": Missions,
    "PILLARS":Pillars,
    "GOALS": Goals
  }

  useEffect(()=>{
    setActiveComponent({component: conponentsList[selectedTab]})
  },[selectedTab])


  return (
    <main className="px-12 py-16 pb-32 bg-gray-100 min-h-screen">
        {/*nav*/}
        
        {/*components */}
        <section className="mt-12">
            <activeComponent.component/>
        </section>
      <TabsButtons/>
    </main>
  )
}

export default App