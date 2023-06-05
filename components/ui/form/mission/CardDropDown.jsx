import React from 'react'

function CardDropDown({value,options=[],onChange}) {
  return (
    <select value={value||null} onChange={e=>{onChange(e)}} className='bg-sky-300 text-white placeholder-slate-300 rounded-lg outline-none focus:bg-opacity-70 focus:placeholder-white  p-1 h-8 px-4 bg-opacity-25 mb-2'>
        {options.map(option=><option value={option.value}>{option.label}</option>)}
    </select>
  )
}

export default CardDropDown