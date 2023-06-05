import axios from '@/lib/axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

function Mission() {
    const router = useRouter()
    
    const [mission,setMission] = useState()
    const [mesurement,setMesurement] = useState()


useEffect(()=>{
  if(!router.query.id )return
    axios.get('missions/'+router.query.id).then(({data})=>{
      
      setMission(data)
      setMesurement(data?.measurement=="MINUTES"?" minutes":" times")
    })
},[router.query])

const getDays=(activeDays,startDateString,endDateString)=>{

  let startDate = new Date(startDateString)
  let endDate = new Date(endDateString)
let numberOfDates;

    while (startDate < endDate) {
        if (activeDays.includes[startDate.getDay()]) {
          numberOfDates++
        }
        startDate.setDate( startDate.getDate() + 1 )
    }

    return numberOfDates

}

if(!mission) {
  return  <>
<Link href={"/app"}><i className="bi bi-arrow-left me-4"></i>Back</Link>
<h2 className='px-12 py-16 pb-32 mb-5 text-center text-2xl'>No achievements</h2></>
}
  return (
    <div className='px-12 py-16 pb-32'>
           <Link href={"/app"}><i className="bi bi-arrow-left me-4"></i>Back</Link>
        <h1 className='text-4xl  text-slate-900 mx-auto w-fit mb-16'>{mission?.name}</h1>

      <h2 className='mb-5 text-center text-2xl'>You have achieved {mission?.DailyLogs?.reduce((prev,next)=>{ return prev+(+next.achieved)},0)} {mesurement}</h2>
      {/* {getDays([0,1],"30/5/2023","13/6/2023")} */}
    <div className='grid grid-cols-6 gap-4'>
          {
            mission?.DailyLogs?.map((log)=>{
              return <div className='p-2 bg-green-600 text-white text-center rounded-md'>
                <h1 className=''>{log.onDate}</h1>
                <h2 className='mt-1 text-sm font-light'> Achieved {log.achieved} {mesurement}</h2>
              </div>
            })
          }
    </div>
        
    </div>
  )  
}



export default Mission