import ContextAPI from '@/ContextAPI'

import AppLayout from '@/components/layouts/AppLayout';
import Layout from '@/components/layouts/Layout'
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
const router = useRouter()


  let layout = {component:Layout};
  if(router.asPath.includes("/app")){
    layout.component = AppLayout
  }

  return (
  <ContextAPI>
    <layout.component>
    <Toaster  position="top-center"   reverseOrder={false}/>
      <Component {...pageProps} />
    </layout.component>


  </ContextAPI>
  )
}
