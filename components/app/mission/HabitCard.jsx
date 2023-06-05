import Link from 'next/link'
import React from 'react'

function HabitCard({ habit,activeDay,updateMissionAchievedCount ,handleStartTimer,onGoingMission}) {
  
  const log = habit.DailyLogs.find(log=>log.on_date==activeDay.activeDayDate)

  const achieved = (log && log.achieved >= habit.to_achieve)


  return (
    <div className="flex w-full items-center gap-5 relative">
   
      {
        achieved?
        <span className="text-sm text-gray-600 relative z-20 bg-slate-100 w-10 flex justify-center">
           <i className="bi bi-check-lg flex justify-center text-2xl text-white rounded-full bg-green-500 p-1 me-1"></i>
        </span>
        :<span className="w-10 text-sm text-gray-600 relative z-20 bg-slate-100">{habit.date_or_time}</span>
      }

      <div className="bg-gray-400 w-0.5 h-full absolute z-10 left-4 "></div>

      <div onClick={() => {
        // setSelectedTab('GOALS');
      }} className={`flex-auto text-start p-5 ${achieved?"bg-green-500":"bg-sky-500"} rounded-xl _hover:scale-105 transition-all relative shadow-lg ${(onGoingMission&&onGoingMission.mission.id ==habit.id)&&"outline outline-4 outline-sky-300 animate-selected"}`}>

        <div className="flex items-center">
          <Link href={`/app/mission/${habit.id}/`}>
            <h1 className="text-white  font-bold relative z-20">{habit.name}</h1>
          </Link>
          <Link href={"/app/goal/" + habit.goal.id} className={`ms-auto w-fit text-sm hover:bg-opacity-70 text-white bg-opacity-50 ${achieved?'bg-green-600':'bg-sky-600'} p-2 rounded-lg px-3`}>{habit.goal.name}</Link>
        </div>

        <h2 className='font-light text-white'>Achieved</h2>

        {
          habit.measurement === 'COUNT' ? <div className='text-white mt-2 flex justify-between'>
              <div>
                <input className='w-16 rounded-md text-gray-700 text-center' value={log?.achieved || 0} /> / {habit.to_achieve} times
              </div>
              <div className='flex gap-4'>
                <i onClick={e=>{updateMissionAchievedCount(habit.id,activeDay.activeDayDate,1)}} class={`cursor-pointer shadow-sm hover:bg-opacity-70 bi bi-plus-lg bg-opacity-50 ${achieved?'bg-green-600':'bg-sky-600'} h-8 rounded-md aspect-square flex items-center justify-center`}></i>
                <i onClick={e=>{updateMissionAchievedCount(habit.id,activeDay.activeDayDate,-1)}} class={`cursor-pointer shadow-sm hover:bg-opacity-70 bi bi-dash-lg bg-opacity-50  ${achieved?'bg-green-600':'bg-sky-600'} h-8 rounded-md aspect-square flex items-center justify-center`}></i>
              </div>
            </div>
            : <div className='text-white mt-2 flex justify-between'>
              <div>
                <input className='w-16 rounded-md text-gray-700 text-center' value={log?.achieved || 0} /> / {habit.to_achieve} minutes
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-light'>Timer</span>
              <i onClick={()=>{handleStartTimer(habit,log)}} class={`cursor-pointer shadow-sm hover:bg-opacity-70 bi bi-play bg-opacity-50  ${achieved?'bg-green-600':'bg-sky-600'} h-8 rounded-md aspect-square flex items-center justify-center`}></i>
              </div>
            </div>
        }

      </div>
    </div>
  )
}

export default HabitCard