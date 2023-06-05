
import React, { useEffect, useState } from 'react'
import { ACTIVE_DAYS } from '@/database/util/data'

function ActiveDays({handleMissionUpdate, mission}) {
    
    const [activeDays, setActiveDays] = useState(
        [...ACTIVE_DAYS.map(a=>{return {...a}})] //DEEP CLONING otherwise it all the components will be refering to the same component 😇 
    )
    

    //Toggle the buttons according to the mission active days
    useEffect(()=>{
        console.log("currentActiveDays",mission.activeDays)
        let _activeDays = [...activeDays]
        mission.activeDays.forEach(activeIndex=>{
            _activeDays[activeIndex-1].active = true;
        })
        setActiveDays(_activeDays)
    },[])

    const getClasses = (active)=>{
        if(active){
            return "bg-white text-sky-500"
        }
        return "bg-white bg-opacity-20 text-gray-100"
    }
    
    const handleClick = (value)=>{

        let _activeDays = [...activeDays]
        
        let currentDay = _activeDays.find(day =>day.value === value)
        
        currentDay.active = !currentDay.active
        
        
        setActiveDays([..._activeDays])

        handleMissionUpdate(
            [..._activeDays.filter(ad=>ad.active).map(ad=>ad.value)],mission.id,'activeDays'
        )

    }

    const getActiveDay = (activeDay)=>{
        return <div key={mission.id+activeDay.value} onClick={()=>handleClick(activeDay.value)} className={"w-8 flex justify-center items-center cursor-pointer transition-all hover:scale-105 p-1 px-2  rounded-lg "+getClasses(activeDay.active)}> {activeDay.label}</div>
    }

  return (
    <>
    <div className='flex gap-x-4 mt-2 mb-5'>
        {activeDays?.map(activeDay=>{
            return getActiveDay(activeDay)
        })}
    </div>
        </>
  )
}

export default ActiveDays