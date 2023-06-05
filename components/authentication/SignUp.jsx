import React,{useRef,useState} from 'react'
import SideDecoration from './SideDecoration'
import Link from 'next/link'


import axios from '../../lib/axios';
import { useRouter } from 'next/router';
import { useContextAPI } from '@/ContextAPI';
import Loading from '../Loading';

function SignUp() {
    const router = useRouter()

    const {setUser} = useContextAPI()
    const [errors,setErrors] = useState({})
    const [isLoading,setIsLoading] = useState(false)

    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()

    const validate = ()=>{
        const _errors = {};
        let isValid = true;

        if(!firstNameRef.current.value || firstNameRef.current.value.trim() == ""){
            _errors['firstName'] = "First Name is required"

        }


        if(!lastNameRef.current.value || lastNameRef.current.value.trim() == ""){
            _errors['lastName'] = "Last Name is required"
        
        }



        if(!lastNameRef.current.value || lastNameRef.current.value.trim() == ""){
            _errors['lastName'] = "Last Name is required"
        
        }



        if(!emailRef.current.value || emailRef.current.value.trim() == ""){
            _errors['email'] = "Email is required"
        }

        //password 
        if(!passwordRef.current.value || passwordRef.current.value.trim() == ""){
            _errors['password'] = "password is required"
        
        }else if(passwordRef.current.value.length < 8){
                _errors['password'] = "password is too short"
        }else{
            //confim pass
            if(!confirmPasswordRef.current.value || confirmPasswordRef.current.value.trim() == ""){
                _errors['confirmPassword'] = "Confirm password is required"
            
            }else if(confirmPasswordRef.current.value != passwordRef.current.value){
                    _errors['confirmPassword'] = "Not matching password"
            }
        }
        

        isValid = Object.keys(_errors).length== 0
        setErrors(_errors)
        return isValid;
    }

    const signUp = (e)=>{
        e.preventDefault()
        setIsLoading(true)
        let isValid = validate()
        if(!isValid) {
            setIsLoading(false)
            return
        };

        
        let data = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
        }

        //axios
        axios.post('/user/signup',data).then(({data})=>{
            console.log("🧑  User in register",data)
            setUser(data);
            router.push("/app")
        }).catch((err)=>{
            alert('internal error')
            console.log(err)
        }).finally(()=>{
            setIsLoading(false);
        })
    }

  return (
    <>
        {isLoading&& <Loading/>}
    <div className="px-12 py-16 grid grid-cols-2 to-amber-100 from-transparent bg-gradient-to-l">
    <div className='relative'>
           <SideDecoration/>
        </div>
    <div className="col-span-1 ">
        <form onSubmit={signUp} className='flex flex-col gap-4 w-3/4 mx-auto justify-center  h-full' autoComplete="off" autoFill={false}>
            <h1 className='text-4xl  text-slate-900 mx-auto w-fit mb-6'>Sign Up</h1>
            <div className='grid grid-cols-2 w-full gap-x-4'> 
                <input type="text" ref={firstNameRef} name="first" placeholder="First Name" className='flex-1 shrink-1  basis-0 p-4  bg-gray-300 block '  autoComplete="new-name" />
                <input type="text" ref={lastNameRef} name="first" placeholder="Last Name" className='flex-1 shrink-0 basis-0 p-4  bg-gray-300 block '  autoComplete="new-name" />
            </div>
            {errors['firstName']&&<span className="text-red-600 text-sm">{errors['firstName']}</span>}
            {errors['lastName']&&<span className="text-red-600 text-sm">{errors['lastName']}</span>}

            <input type="email" ref={emailRef} name="email"  placeholder="Email" className='p-4 bg-gray-300 '  autoComplete="new-email" />
            {errors['email']&&<span className="text-red-600 text-sm">{errors['email']}</span>}
            
            <input type="password" ref={passwordRef} name="password"  placeholder="Password" placeholde="Passord" className='p-4  bg-gray-300 '  autoComplete="new-password" />
            {errors['password']&&<span className="text-red-600 text-sm">{errors['password']}</span>}
            
            <input type="password" ref={confirmPasswordRef} name="confirm-password" placeholder="Confirm Password"className='p-4  bg-gray-300 '  autoComplete="new-confirm-password" />
            {errors['confirmPassword']&&<span className="text-red-600 text-sm">{errors['confirmPassword']}</span>}
            
            <button className="py-3 px-9  bg-amber-500 text-white rounded-full  block w-fit hover:scale-110 transition-all mx-auto">submit</button>
            <Link href="/login" className='mx-auto font-light text-sm underline'>Have account? Login</Link>
        </form>
    </div>
</div>
</>
  )
}

export default SignUp