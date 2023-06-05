import FormImage from '@/components/ui/FormImage'
import { useRouter } from 'next/router'
import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import axios from '../../../lib/axios'
import Link from 'next/link'
import Loading from '@/components/Loading'
import pillar from '@/pages/app/pillar'
import Input from '@/components/ui/form/Input'
import Button from '@/components/ui/form/Button'
import MiniGoalCard from './MiniGoalCard'


function Pillar() {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [readOnly,setReadOnly] = useState(false)
  const  router = useRouter()


  const id = router.query.id


  const [fields, setFields] = useState({})

  useEffect(()=>{
    if(!router.query.id || fields.id ) return
    axios.get(`/pillars/${router.query.id}`)
    .then(({data})=>setFields(data))
    .catch(error=>{
      if(error.response)
        toast.error(error.response.message)
      else
        toast.error("Intenal Error")
    console.log(error)
    })
  },[router.query])


  useEffect(()=>{
    setReadOnly(router.query.readonly||false)
  },[router.query])



  //Update Fields
  const setField = (e,field)=>{
    let _fields = {...fields}
    _fields[field] = e.target.value;
    setFields(_fields)
  }

  const validate = ()=>{
    let _errors = {}
    let isValid = true

    if(fields["name"].trim() == ""){
      _errors['name'] = "Name is required";
      isValid = false;
    }

    setErrors(_errors)
    return isValid
  }

  const handleSubmit = (event)=>{
    setIsLoading(true);
    event.preventDefault();

    if(!validate()){
      setIsLoading(false);
      return;
    }

    //TODO Validate
    const form = new FormData();
    form.append("name", event.target["name"].value);
    form.append("image", event.target["file"].files[0]);


    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    axios.post("/pillars"+(id?`/${id}`:""),form,config).then(({data})=>{
      toast.success(`Pillar ${id?'update':'created'} successfully!`)
      router.push("/app/pillar/"+data.id+"?readonly=true")
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

        <h1 className='text-4xl  text-slate-900 mx-auto w-fit mb-16'>{id?"Edit Pillar":"Create New Pillar"}</h1>
        <form onSubmit={handleSubmit}  action="" className='flex flex-col w-3/4 mx-auto gap-4 mt-7'>
            <div className='grid grid-cols-3 gap-5'>
              <FormImage image={fields?.image} readOnly={readOnly}/>
              
              <div className='flex flex-col gap-y-4 col-span-2'>
                <Input label="Name" value={fields?.name} setField={setField} name="name" placeholder="Name" isRequired={true} readOnly={readOnly}/>
              <Button setReadOnly={setReadOnly} readOnly={readOnly}/>
              </div>
            </div>
        </form>

        
        {(readOnly)&&<div className="w-3/4 mx-auto">
            <h1 className="text-xl mt-10">Goals:</h1>
            <div className="grid grid-cols-4">
                {fields.goals?.map(goal=><MiniGoalCard goal={goal}/>)}
            </div>
        </div>
        
        }
    </div>
  )
}

export default Pillar