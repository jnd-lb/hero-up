import React from 'react'

function FilterDropdown({options,value, onChange}) {
  return (
    <select value={value} onChange={onChange} className='bg-transparent px-5 outline-none'>
        {options.map(option=><option value={option.value}>{option.label.substring(0,25)}{(option.label.length>25&&"...")}</option>)}
    </select>
  )
}

export default FilterDropdown