import React from 'react'
import Navbar from '../Navbar'
import { useContextAPI } from '@/ContextAPI'
import Timer from '../app/Timer'

function AppLayout({children}) {
  const {selectedMissionAndLog,setSelectedMissionAndLog}  = useContextAPI()
  return (
    <>
    <Navbar/>
        {children}
        {selectedMissionAndLog&&<Timer setSelectedMissionAndLog={setSelectedMissionAndLog} selectedMissionAndLog={selectedMissionAndLog}/>}
    </>
  )
}

export default AppLayout