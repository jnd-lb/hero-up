import React, { useState } from 'react'
import MissionFormCard from './MissionFormCard'

function MissionsAdder({missions,setMissions,deleteMissionOnBackend}) {

const date = new Date()

const missionTemplate = {
    newMission : true,
    id: (new Date()).getTime(),
    name: "",
    type: "HABIT",
    measurementType: "MINUTES",
    toAchieve: 60,// one minute or one count
    dateOrTime: "",
    activeDays: [1,2,3,4,5,6,7]
}

const handleAddNewMission = ()=>{
    let _missons = [...missions,{...missionTemplate}]
    setMissions(_missons)
}

const closeMission = (id)=>{

    const _missions = [...missions.filter(mission=>{
      if(mission.id == id && !mission.newMission) deleteMissionOnBackend(id)
     return mission.id != id
    })]
    setMissions(_missions)
}


//UPDATE MISSION
const handleMissionUpdate = (value, missionId, field)=>{
  const _missions = [...missions]

  console.log("MISSION ID",missionId)

  const currentMission = _missions.find(mission=>{
    return (mission.id == missionId)
  })

  console.log("Mission found", currentMission)

  currentMission[field] = value
  
  setMissions(_missions)

  console.log("🏈 ",_missions)
}


  return (
    <div className="card grid gap-6 mt-5">
        {missions.map(mission=><MissionFormCard handleMissionUpdate={handleMissionUpdate} closeMission={closeMission} mission={mission} key={mission.id}/>)}
        <div onClick={handleAddNewMission} className="cursor-pointer select-none flex items-center justify-center py-6 text-gray-600 text-2xl rounded-xl border-gray-500 border-2 border-dashed hover:scale-105 transition-all"> + </div>
    </div>
  )
}

export default MissionsAdder