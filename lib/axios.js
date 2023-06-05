import axios from 'axios'


const instance = axios.create({
    baseURL: (process.env.NEXT_PUBLIC_BACKEND_BASE_URL||'http://localhost:3000')+'/api',
    headers:{
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    },
    withCredentials: true
  });


export default instance;
