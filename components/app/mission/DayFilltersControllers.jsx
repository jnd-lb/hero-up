import React from 'react'
import { ACTIVE_DAYS } from '@/database/util/data'

function DayFilltersControllers({activeDay,setActiveDay,todayNumber}) {

  const today = new Date()

  const getDate = (day)=>{
      let temp = todayNumber - day.value;
      let date = new Date()

      date.setDate(today.getDate() - temp)
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        dateTime: date.setHours(0, 0, 0, 0)
      }
  }

  return (

    <div className='grid grid-cols-7 w-1/2 mx-auto'>
      {ACTIVE_DAYS
       .map((day)=>
       
       {  
        
      let date=getDate(day)
       return<>
        <span 
                onClick={()=>{setActiveDay(
                          {
                            activeDayNumber:day.value,
                            activeDayDate: date.dateTime
                          }
                          )}}
        className={`${(day.value == todayNumber)&&'ring ring-orange-400'} relative w-11 aspect-square flex justify-center font-meduim items-center cursor-pointer transition-all hover:scale-105 p-1 px-2  rounded-lg  text-gray-700 shadow-sm 
        ${(activeDay.activeDayNumber==day.value)?'text-white bg-sky-500':'text-gray-500 bg-white'}`}>
          
          {day.label}
        <span className='absolute -bottom-8 text-xs text-gray-400'>{`${date.day}/${date.month}`}</span>
        </span>
      </>
       }
      
      )}
    </div>
  )
}

export default DayFilltersControllers