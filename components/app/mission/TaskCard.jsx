import Link from 'next/link'
import React, { useState } from 'react'

function TaskCard({task,toggleCheck, isUpcomming}) {
const [animation,setAnimation] = useState(false)

const handleAnimation = ()=>{
    setAnimation(true)
    setTimeout(()=>setAnimation(false),700)
}

  return (
    <div className={'h-16 flex items-center bg-white p-2 px-4 rounded-lg cursor-pointer '+((animation&&" outline-1 outline outline-sky-300"))}>
        {/* <input type="checkbox" name="" id="" checked={task.state == "DONE"}/> */}

        <div onClick={()=>{toggleCheck(task.id,isUpcomming),handleAnimation()}}>
        {

            (task.state == "DONE")?
            <span className="bg-sky-500 w-7 aspect-square flex items-center justify-center text-white rounded-sm">
                <i className="bi bi-check-lg"></i>
            </span>
            :
            <span className="bg-gray-200 hover:bg-gray-300 w-7 aspect-square flex items-center justify-center text-white rounded-sm">
            </span>
        }
        </div>

        <span className={`ms-4 ${(task.state == "DONE")?'line-through text-gray-500':'text-gray-800'}`}>
            {task.name}
        </span>

        <span className="mx-5 text-sm text-gray-500">{task.date_or_time}</span>
        <Link href={"/app/goal/"+task.goal.id} className='ms-auto w-fit text-sm text-gray-500 hover:bg-gray-200 bg-gray-100 p-2 rounded-lg'>{task.goal.name}</Link>
    </div>
  )
}

export default TaskCard