import React from 'react'

function Dropdown({label,isRequired=false,name,type='text',value=null,setField, readOnly=false,  options=[]}) {
  return (
    <div>
        <h2 className='mb-1'>{label} {!isRequired&&<span className="text-gray-500">(Optional)</span>}</h2>
        <select  
        value={value} name={name} onChange={(e)=>setField(e,name)} placeholder={label} 
        autoComplete={"new-"+name} readOnly={readOnly}
        className={`w-full ${readOnly?"bg-transparent font-bold py-2  outline-none":"bg-gray-50 p-4 rounded-xl"}`}
        >
          {options.map(option=><option name={name} value={option.value}>{option.label}</option>)}
        </select>
    {<span className="text-red-600 text-sm">{}</span>}
  </div>
  )
}

export default Dropdown