import { useEffect } from 'react';
import Main from '../components/Main'
import Link from 'next/link'
import ContextAPI from '@/ContextAPI';



export default function Home() {
  useEffect(()=>{
    try{
      AOS.init();
    }catch(e){
      setTimeout(()=>{
        AOS.init();
      },1500)  
    }
  },[])

  return (<Main/>)
}
