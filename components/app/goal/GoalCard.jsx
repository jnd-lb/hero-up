import { useContextAPI } from '@/ContextAPI'
import Link from 'next/link'
import React from 'react'

function GoalCard({goal,handleDelete}) {
  const {handleRightClickMenu} = useContextAPI()

  const InnerMenu = ()=>{
    return (
        <div className='flex flex-col gap-3'>
            <Link className='hover:bg-slate-50' href={"/app/goal/"+goal.id}><i className="bi bi-pencil text-blue-600  me-5 "></i> Edit</Link>
            <hr/>
            <button onClick={()=>handleDelete(goal.id)} className='text-start hover:bg-slate-50' ><i className="bi bi-trash text-red-600 me-5 "></i>  Delete</button>
        </div>
    )
  }

  let bgColor = 'sky-500'
  switch(goal.state){
    case "On Hold": bgColor='yellow-300'; break;
    case "Completed": bgColor='green-400'; break;
  }
  const getStateIcon = (state) =>{
      switch(state){
        case "On Hold": return <i title="On Hold" className="w-6 bg-opacity-20 aspect-square flex items-center justify-center rounded-full text-white bg-white  absolute z-50 right-3 top-3 bi bi-pause-fill"></i>
        case "Completed": return <i title="Completed" className=" w-6 bg-opacity-20 aspect-square flex items-center justify-center rounded-full text-white bg-white  absolute z-50 right-3 top-3 bi bi-check-lg"></i>
        case "On Going": return <i title="On Going" className="w-6 bg-opacity-20 aspect-square flex items-center justify-center rounded-full text-white bg-white  absolute z-50 right-3 top-3 bi bi-play-fill"></i>
      }
  }

  return (
    
    <Link onContextMenu={(e)=>handleRightClickMenu(e,InnerMenu)} onClick={()=>{
      // setSelectedTab('GOALS');
      //setSelectedPillar(pillar.id)
    }} href={"/app/goal/"+goal.id+"?readonly=true"} className={"bg-"+bgColor+" text-start p-5 _bg-sky-500 rounded-xl hover:scale-105 transition-all relative overflow-hidden shadow-lg z-20"}>
    <span className="hidden from-yellow-300 from-green-400 from-sky-400"></span>

  <div className='grid grid-cols-2 gap-x-4 '>
    <h1 className="text-white  font-bold relative z-20">{goal.name}</h1> 
    <p className="text-white font-thin relative z-20"><span className='font-light'>{goal.daysLeft} days left </span></p>
  </div>
  <div className="grid grid-cols-2 gap-x-4 ">
  <p className="text-white font-thin relative z-20 text-sm"><span className='font-light text-base'>From: </span>{goal.startDate}</p>
    <p className="text-white font-thin relative z-20 w-fit text-sm"><span  className='font-light t-white text-base'>To: </span>{goal.dueDate}</p>
  </div>

  <div  className="grid grid-cols-2 gap-x-4 ">
    <p className="font-thin relative z-20 text-white"><span className='font-light text-base'>State: </span><span className='text-sm'>{goal.state}</span></p>
    
    <p className="font-thin relative z-20 text-white flex items-center gap-1">
      <span className='font-light'>Pillar: </span>
      <Link href={"/pillars/"+goal.pillar?.id} className="flex-grow overflow-hidden">
        <span className={`${goal.pillar?.name.length>10&&"marqee-text-animation"} text-sm whitespace-nowrap`}>{goal.pillar?.name}</span>
      </Link>
    </p>
  </div>
  <div className={`w-full h-full bg-gradient-to-r _from-sky-500  from-${bgColor} to-transparent from-50% to-100% absolute top-0 left-0 z-10`}></div>
  <img className="opacity-70 brightness-75 absolute top-0 right-0 w-1/2 h-full object-cover object-center" src={goal.image} alt="" srcset="" />    
  
  {getStateIcon(goal.state)}
</Link>
  )
}

export default GoalCard