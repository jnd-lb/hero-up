import { useContext, useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import axios from "./lib/axios"
import Missions from "./components/app/mission/Missions";
import RightClickMenu from "./components/ui/RightClickMenu";
const Context = createContext();

function ContextAPI({children}) {


  //----------- RightClick ------------------
  const [menuComponent,setMenuComponent] = useState(null)
  const handleRightClickMenu = (e,component) =>{

    window.addEventListener('click', (event) => {
      setMenuComponent(null)
    },{once:true})
    e.preventDefault();

    setMenuComponent({
      component: component,
      x : e.pageX,
      y : e.pageY
    })
  }
 //----------- RightClick ------------------

   //create router
   const router = useRouter();
   
   //States
   const [user,setUser] = useState(null)


   //App
   const [selectedTab, setSelectedTab ] = useState('MISSIONS')
   const [selectedPillar, setSelectedPillar ] = useState()
   const [activeComponent,setActiveComponent] = useState({component: Missions})
   
   const [selectedMissionAndLog,setSelectedMissionAndLog ] = useState()

   


   const notAuthenticatedRoutes=["/","/home","/login","/signup"];
   //User
   useEffect(()=>{
      if(!user && !notAuthenticatedRoutes.includes(router.asPath)){
        
        //try to login using the saved cookie
        axios.get("/user/me").then(({data})=>{
          setUser(data);
        }).catch((err)=>{
          if (err.response &&( err.response.status == 401 ||  err.response.status == 403)) {
            router.push("/login");
         }else{
          alert('internal error')
          console.log("💣 /me error",err)
         }
        })
      }
   },[])


  return (
    <Context.Provider value={{
        user,
        setUser,
        selectedTab,
        setSelectedTab,
        activeComponent,
        setActiveComponent,
        selectedPillar,
        setSelectedPillar,
        handleRightClickMenu,
        selectedMissionAndLog,
        setSelectedMissionAndLog
                            }}>
        {menuComponent&&<RightClickMenu onClick={()=>{setMenuComponent(null)}} x={menuComponent.x} y={menuComponent.y}><menuComponent.component/></RightClickMenu>}
        {children}
    </Context.Provider>
  )
}


export default ContextAPI
export const useContextAPI = () => useContext(Context);
