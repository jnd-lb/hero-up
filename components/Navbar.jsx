import Link from 'next/link';
import React, {useRef} from 'react'
import {useContextAPI} from '../ContextAPI';

function Navbar() {
    const {user} = useContextAPI()

    const navList = useRef();
    const toggleNavList = ()=>{
      navList.current.classList.toggle('hidden')
    }

    return (
    <div className='bg-amber-500'>
    <nav className=" border-gray-200 dark:bg-gray-900 container mx-auto px-20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center py-2">
          <img src="/images/logo.png" className="h-16 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ms-2 text-white">Hero Up</span>
        </Link>
        <button onClick={toggleNavList} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
        <div ref={navList} className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul onClick={toggleNavList}  className="font-normal flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
              <Link href="/app" className="text-lg block pl-3 pe-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent me-5">App</Link>
            </li>
            <li>
              <Link href="/about-us" className="text-lg block pl-3 pe-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent me-5">About Us</Link>
            </li>
            <li>
              {
                user?<Link href="/profile" className="py-3 px-16 text-emerald-900 rounded-3xl bg-white hover:bg-amber-400 hover:text-white transition-all flex gap-4">
                  <img src={user.image} className="aspect-square w-5 rounded-full"/>
                  {user.firstName}
                  </Link> 
                :<Link href="/login" className="py-3 px-16 text-emerald-900 rounded-3xl bg-white hover:bg-amber-400 hover:text-white transition-all">Login</Link>
              }
            </li>
        
          </ul>
        </div>
      </div>
    </nav>

  </div>

  )
}

export default Navbar