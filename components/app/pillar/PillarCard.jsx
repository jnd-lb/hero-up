import { useContextAPI } from '@/ContextAPI'
import Link from 'next/link'
import React, { useState } from 'react'

function PillarCard({pillar,deletePillar}) {

  const {setSelectedTab,selectedTab,setSelectedPillar,handleRightClickMenu} = useContextAPI()
 
  const handleDelete = (id)=>{
    if(confirm("Are you sure you want to delete?")){
      deletePillar(id)
    }
  }

  const InnerMenu = ()=>{
    return (
        <div className='flex flex-col gap-3'>
            <Link className='hover:bg-slate-50' href={"/app/pillar/"+pillar.id}><i className="bi bi-pencil text-blue-600  me-5 "></i> Edit</Link>
            <hr/>
            <button onClick={()=>handleDelete(pillar.id)} className='text-start hover:bg-slate-50' ><i className="bi bi-trash text-red-600 me-5 "></i>  Delete</button>
        </div>
    )
  }

  return (
    <>
        <Link onContextMenu={(e)=>handleRightClickMenu(e,InnerMenu)} onClick={()=>{
                // setSelectedTab('GOALS');
                setSelectedPillar(pillar.id)
            }} href={"/app/pillar/"+pillar.id+"?readonly=true"} className="text-start p-5 bg-sky-500 rounded-xl hover:scale-105 transition-all relative overflow-hidden shadow-lg">
        
            <h1 className="text-white  font-bold relative z-20">{pillar.name}</h1>
            <p className="text-white font-thin relative z-20">Served by {pillar.goalsCount} Goals</p>
            <div className='w-full h-full bg-gradient-to-r from-sky-500 to-transparent from-50% to-100% absolute top-0 left-0 z-10'></div>
            <img className="absolute top-0 right-0 w-1/2 h-full object-cover object-center" src={pillar.image} alt="" srcset="" />    
        </Link>
    </>
  )
}

export default PillarCard