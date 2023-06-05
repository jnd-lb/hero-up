import React from 'react'

function RightClickMenu({children,x,y,onClick}) {

  return (
    <div onClick={onClick} className="absolute z-50 w-60 bg-white p-4 shadow-2xl rounded-lg" style={{top:y, left:x}}>
        {children}
    </div>
  )
}

export default RightClickMenu