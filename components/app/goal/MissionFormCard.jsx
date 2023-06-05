import React, { useState } from 'react'
import ActiveDays from '../mission/ActiveDays'
import CardDropDown from '@/components/ui/form/mission/CardDropDown'
import { MISSIONS_TYPES, MEASUREMENT_TYPES } from '@/database/util/data'


function MissionFormCard({ mission, closeMission,readOnly = false ,handleMissionUpdate}) {

    return (
        <div className="text-start p-5 bg-sky-500 rounded-xl  transition-all relative overflow-hidden shadow-lg">
            <i onClick={() => closeMission(mission.id)} className="cursor-pointer bi bi-x-lg text-white absolute right-6"></i>

            {/**Line one */}
            <div>
                {/**Name */}
                <input onChange={(e)=>handleMissionUpdate(e.target.value, mission.id, 'name')} type="text" name="missionName" value={mission.name} placeholder="Name" className='me-4 bg-sky-300 text-white placeholder-slate-300 rounded-lg outline-none focus:bg-opacity-70 focus:placeholder-white  p-1 px-4 bg-opacity-25 mb-2' />

                {/**Type */}
                <span className='text-sm ms-4 me-2 text-white'>Type</span>
                <CardDropDown value={mission.type} 
                onChange={(e) => { 
                        handleMissionUpdate(e.target.value, mission.id, 'type')
                    }}
                options={MISSIONS_TYPES} />

                {/* TIME/DATE */}
                {
                    mission.type == "HABIT" ?
                        <>
                            <span className='text-sm ms-4 me-2 text-white'>at</span>
                            <input onChange={(e)=>handleMissionUpdate(e.target.value, mission.id, 'dateOrTime')} value={mission.dateOrTime}  type="time" name="dateOrTime" placeholder="Name here" className='bg-sky-300 text-white placeholder-slate-300 rounded-lg outline-none focus:bg-opacity-70 focus:placeholder-white  p-1 px-4 bg-opacity-25 mb-2' />
                        </>
                        :
                        <>
                            <span className='text-sm ms-4 me-2 text-white'>on</span>
                            <input onChange={(e)=>handleMissionUpdate(e.target.value, mission.id, 'dateOrTime')} type="date"  value={mission.dateOrTime} name="dateOrTime" placeholder="Name here" className='bg-sky-300 text-white placeholder-slate-300 rounded-lg outline-none focus:bg-opacity-70 focus:placeholder-white  p-1 px-4 bg-opacity-25 mb-2' />
                        </>
                }
            </div>


            {/**Line two*/}
            <div className='my-2'>
                {
                    mission.type == "HABIT" && <>
                        <span className='text-white text-sm'>Active Days:</span>
                        <ActiveDays mission={mission} handleMissionUpdate={handleMissionUpdate}/>
                    </>
                }
            </div>

            {/**Line two*/}
            <div>
                {
                mission.type == "HABIT"&&<>
                        <CardDropDown  onChange={
                            (e) => {   
                                        handleMissionUpdate(e.target.value, mission.id, 'measurementType')}}
                                    
                            value={mission.measurementType}
                            options={MEASUREMENT_TYPES} />
                        {mission.type == "HABIT" && <input onChange={(e)=>handleMissionUpdate(e.target.value, mission.id, 'toAchieve')}  value={mission.toAchieve} type="text" name="measurementTypeAchieved" placeholder={(mission.measurementType=="MINUTES")?"How many minutes per day?":"How  many times?"} className='ms-4 bg-sky-300 text-white placeholder-slate-300 rounded-lg outline-none focus:bg-opacity-70 focus:placeholder-white  p-1 px-4 bg-opacity-25 mb-2' />}
                    </>
                }
            </div>


        </div>
    )
}

export default MissionFormCard