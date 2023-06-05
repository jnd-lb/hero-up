import React,{useEffect,useState} from 'react'
import PillarCard from './PillarCard'
import FloatingButton from '@/components/ui/FloatingButton'
import axios from '@/lib/axios'
import { toast } from 'react-hot-toast'

function Pillars() {
  const [pillars, setPillars] = useState(null)
  

  useEffect(()=>{
    axios.get('/pillars')
    .then(({data})=>setPillars(data))
    .catch((err)=>{
      if(err.response){
        toast.error(err.response.message)
      }
      console.log(err)
    })
    
  },[])


  const deletePillar = (id)=>{
    axios.delete('/pillars/'+id)
    .then(({data})=>{
      toast.success("Pillar deleted successfully")
      let _pillars = pillars.filter((p)=>p.id!=id)
      setPillars(_pillars)
    })
    .catch((err)=>{
      if(err.response){
        toast.error(err.response.message)
      }
      console.log(err)
    })
    
  }
  
  if(!pillars){
    return (
      <>
        <h1>No pillars</h1>
        <FloatingButton label="+" link="/app/pillar"/>
      </>
    )
  }

  return (
    <>
      <div className='grid grid-cols-4 gap-7'>
        {pillars.map(pillar=><PillarCard key={pillar.id}  pillar={pillar} deletePillar={deletePillar} />)}
      </div>
      <FloatingButton label="+" link="/app/pillar"/>
    </>
  )
}

export default Pillars