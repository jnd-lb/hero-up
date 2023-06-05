import Link from 'next/link'
import React from 'react'

function MiniGoalCard({goal}) {



  const getStateIcon = (state) =>{
    switch(state){
      case "On Hold": return <i title="On Hold" className="w-6 bg-opacity-20 aspect-square flex items-center justify-center rounded-full text-white bg-white  absolute z-50 right-3 top-3 bi bi-pause-fill"></i>
      case "Completed": return <i title="Completed" className=" w-6 bg-opacity-20 aspect-square flex items-center justify-center rounded-full text-white bg-white  absolute z-50 right-3 top-3 bi bi-check-lg"></i>
      case "On Going": return <i title="On Going" className="w-6 bg-opacity-20 aspect-square flex items-center justify-center rounded-full text-white bg-white  absolute z-50 right-3 top-3 bi bi-play-fill"></i>
    }
}


  let bgColor = 'bg-sky-500'
  switch(goal.state){
    case "On Hold": bgColor='bg-yellow-300'; break;
    case "Completed": bgColor='bg-green-400'; break;
  }

  return (

    <Link href={"/app/goal/"+goal.id+"?readonly=true"} className={`block w-52  text-start p-5 ${bgColor} rounded-xl hover:scale-105 transition-all relative overflow-hidden shadow-lg`}>

      <div className='grid grid-cols-1 gap-x-4'>
        <h1 className="text-white  font-bold relative z-20">{goal.name}</h1> 
        <p className="text-white font-thin relative z-20"><span className='font-light'>{goal.daysLeft} days left </span></p>
      </div>
      <div className="grid grid-cols-1 gap-x-4 ">
      <p className="text-white font-thin relative z-20 text-sm"><span className='font-light text-base'>From: </span>{goal.startDate}</p>
        <p className="text-white font-thin relative z-20 w-fit text-sm"><span  className='font-light t-white text-base'>To: </span>{goal.dueDate}</p>
      </div>

      <div  className="grid grid-cols-1 gap-x-4 ">
        <p className="font-thin relative z-20 text-white"><span className='font-light text-base'>State: </span><span className='text-sm'>{goal.state}</span></p>
        
      </div>
      {getStateIcon(goal.state)}
      {/* <div className='w-full h-full bg-gradient-to-r from-sky-500 to-transparent from-50% to-100% absolute top-0 left-0 z-10'></div> */}
      {/* <img className="opacity-70 brightness-75 absolute top-0 right-0 w-1/2 h-full object-cover object-center" src={goal.image} alt="" srcset="" />     */}

</Link>
  )
}

export default MiniGoalCard