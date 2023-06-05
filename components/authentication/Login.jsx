import Link from 'next/link'
import React,{useState,useRef, useEffect} from 'react'
import SideDecoration from './SideDecoration'
import Loading from '../Loading'
import axios from '../../lib/axios'
import { useContextAPI } from '@/ContextAPI'
import { useRouter } from 'next/router'

function Login() {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errors, setErrors] = useState({})

  const {setUser} = useContextAPI()
  const emailRef = useRef()
  const passwordRef = useRef()


  const validate = ()=>{
    const _errors = {};
    let isValid = true;


    if(!emailRef.current.value || emailRef.current.value.trim() == ""){
        _errors['email'] = "Email is required"
    }

    //password 
    if(!passwordRef.current.value || passwordRef.current.value.trim() == ""){
        _errors['password'] = "password is required"
    }

    isValid = Object.keys(_errors).length== 0
    setErrors(_errors)
    return isValid;
}

  const login = (e)=>{
    setIsLoading(true)
    e.preventDefault()
    if(!validate()) {
      setIsLoading(false)
      return
    }

    axios.post("/user/login",{
      email: emailRef.current.value,
      password : passwordRef.current.value
    }).then(({data}) => {
      setUser(data)
      router.push("/app")
    }).catch(err=>{
        if (err.response && err.response.status == 401) {
            setErrorMessage(err.response.data.message)
         }else{
          alert('internal error')
          console.log("💣 /me error",err)
         }
    }).finally(()=>{
      setIsLoading(false)
    })

    
  }


  return (
    <>
      {isLoading&&<Loading/>}
      <div className="px-12 py-16 grid grid-cols-2 to-amber-200 from-transparent bg-gradient-to-l">
          <div className='relative'>
                <SideDecoration/>
              </div>
          <div className="col-span-1 ">
              <form onSubmit={login} className='flex flex-col gap-4 w-3/4 mx-auto justify-center  h-full'>
                  <h1 className='text-4xl  text-slate-900 mx-auto w-fit mb-6'>Login</h1>
                  {errorMessage&&<p className="text-red-600 bg-red-600 bg-opacity-10 p-5">{errorMessage}</p>}
                  <input ref={emailRef} type="email" name="email" className='p-4 bg-gray-300 '/>
                  {errors['email']&&<span className="text-red-600 text-sm">{errors['email']}</span>}

                  <input ref={passwordRef} type="password" name="password" className='p-4  bg-gray-300 '/>
                  {errors['password']&&<span className="text-red-600 text-sm">{errors['password']}</span>}

                  <button className="py-3 px-9  bg-amber-500 text-white rounded-full  block w-fit hover:scale-110 transition-all mx-auto">submit</button>
                  <Link href="/signup" className='mx-auto font-light text-sm underline'>Dont have account? Sign up</Link>
              </form>
          </div>
      </div>
    </>
  )
}

export default Login