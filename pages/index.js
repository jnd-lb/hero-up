import Image from 'next/image'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Home() {
  return (<div>
      <Main/>
     <Link className="bg-amber-500 p-5 rounded-lg text-white font-black block w-fit my-10" href={"/profile"}>Profile</Link>
   
    
  </div>)
}
