import React from 'react'

function FilterContainer({ children }) {
  return (
    <div className="py-3 px-5 rounded-3xl shadow-xl drop-shadow-lg flex gap-9 mx-auto w-fit z-50 bg-white">
      {children}
    </div>
  )
}

export default FilterContainer