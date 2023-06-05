import React from 'react'

function Input({label,isRequired=false,name,type='text',value=null,setField, readOnly=false}) {
  return (
    <div>
        <h2 className='mb-1'>{label} {!isRequired&&<span className="text-gray-500">(Optional)</span>}</h2>
        <input type={type} value={value} name={name} onChange={(e)=>setField(e,name)} placeholder={label} 
        
        className={`w-full ${readOnly?"bg-transparent font-bold py-2  outline-none":"bg-gray-50 p-4 rounded-xl"}`}
        
        autoComplete={"new-"+name} readOnly={readOnly}/>
    {<span className="text-red-600 text-sm">{}</span>}
  </div>
  )
}

export default Input