import { useContextAPI } from '@/ContextAPI';
import Loading from '@/components/Loading';
import FormImage from '@/components/ui/FormImage';
import Button from '@/components/ui/form/Button';
import Dropdown from '@/components/ui/form/DropDown';
import Input from '@/components/ui/form/Input';
import axios from '@/lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import MissionsAdder from './MissionsAdder';

function Goal() {

  const {selectedPillar} = useContextAPI()

  const [isLoading, setIsLoading] = useState(false)
  const  router = useRouter()
  const [readOnly,setReadOnly] = useState(false)

  const id = router.query.id


  const [fields, setFields] = useState({})
  const [options, setOptions] = useState([])
  
  const [missions, setMissions] = useState([])
  const [deletedMissions, setDeletedMissions] = useState([])



  const stateOptions = [
    {label:"On Going",value:"On Going"},
    {label:"On Hold",value:"On Hold"},
    {label:"Completed",value:"Completed"}
  ]

  useEffect(()=>{
    axios.get("/pillars")
    .then(({data})=>{
      setOptions(data.map(element=>{
        return {value:element.id, label:element.name}
      }));
    })
    .catch(err=>{

    })

    
  },[])

  useEffect(()=>{
    if(!router.query.id || fields.id ) return
    axios.get(`/goals/${router.query.id}`)
    .then(({data})=>{
      console.log(data)
      setFields(data)
      setMissions(data.missions)
    })
    .catch(error=>{
      if(error.response)
        toast.error(error.response.message)
      else
        toast.error("Intenal Error")
    console.log(error)
    })
  },[router.query])

  const handleDeleteMissionOnBackend = (id)=>{
    setDeletedMissions([...deletedMissions,id])
  }


  //Update Fields
  const setField = (e,field)=>{
    let _fields = {...fields}
    _fields[field] = e.target.value;
    setFields(_fields)
  }

    const handleSubmit = (event)=>{
  
    setIsLoading(true);
    event.preventDefault();

    const validate = ()=>{
      //validate
      return true;
    }
    

    const missionValidate = ()=>{
      //TODO Validate
      return true;
    }
    
    if(!validate() || !missionValidate()){
      setIsLoading(false);
      return;
    }

    //TODO Validate
    const form = new FormData();
    form.append("name", event.target["name"].value);
    form.append("startDate", event.target["startDate"].value);
    form.append("dueDate", event.target["dueDate"].value);
    form.append("pillarId", event.target["pillarId"].value);
    form.append("state", event.target["state"].value);
    form.append("image", event.target["file"].files[0]);
    form.append("missions", JSON.stringify(missions));
    form.append("deletedMissions", JSON.stringify(deletedMissions));


    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    axios.post("/goals"+(id?`/${id}`:""),form,config).then(({data})=>{
      toast.success(`Goal ${id?'update':'created'} successfully!`)
      router.push("/app/goal/"+data.id+"?readonly=true")
    }).catch((err)=>{
      toast.error("Internal Error.")    
      console.log(err)
    }).finally(()=>{
      setIsLoading(false)
    })

  }


  return (
        <div className='px-12 py-16 pb-32'>
      {isLoading&&<Loading/>}

        <Link href={"/app"}><i className="bi bi-arrow-left me-4"></i>Back</Link>

        <h1 className='text-4xl  text-slate-900 mx-auto w-fit mb-16'>{id?"Edit Goal":"Create New Goal"}</h1>
        <form onSubmit={handleSubmit}  action="" className='flex flex-col w-3/4 mx-auto gap-4 mt-7'>
            <div className='grid grid-cols-3 gap-5'>
              <FormImage image={fields?.image} readOnly={readOnly}/>
              
              <div className='flex flex-col gap-y-4 col-span-2'>    
                <Input label="Name" value={fields?.name}  setField={setField} name="name" placeholder="Name" isRequired={true} readOnly={readOnly}/>
                <Dropdown label="Pillar" value={fields?.pillarId||selectedPillar||0} options={options} setField={setField} name="pillarId" placeholder="Pillar" isRequired={true} readOnly={readOnly}/>
                <Dropdown label="State" value={fields?.state||"On Going"} options={stateOptions} setField={setField} name="state" placeholder="state" isRequired={true} readOnly={readOnly}/>
              </div>


                <Input label="Start Date" type="date" value={fields?.startDate}  setField={setField} name="startDate" placeholder="Start Date" isRequired={true} readOnly={readOnly}/>
                <Input label="End Date" type="date" value={fields?.dueDate}  setField={setField} name="dueDate" placeholder="End Date" isRequired={true} readOnly={readOnly}/>
            </div>

            <h2 className="text-xl mt-10">Missions</h2>
            <MissionsAdder deleteMissionOnBackend={handleDeleteMissionOnBackend} missions={missions} setMissions={setMissions} />
            <Button setReadOnly={setReadOnly} readOnly={readOnly}/>
        </form>
    </div>
  )
}

export default Goal