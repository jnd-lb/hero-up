import { useRouter } from 'next/router';
import React from 'react'

function Button({readOnly=false}) {
    const router = useRouter()

    const handleOnclick = (e)=>{
        if(readOnly) {
            e.preventDefault();
            delete router.query.readonly; 

            router.replace({
                query: { ...router.query},
             });
        }
    }
    
  return (
    <button onClick={handleOnclick} className={(readOnly?"bg-sky-400":"bg-amber-500")+" mt-auto py-3 px-9 text-white rounded-full  block w-fit hover:scale-110 transition-all ms-auto"}>{readOnly?"Edit":"Save"}</button>
  )
}

export default Button