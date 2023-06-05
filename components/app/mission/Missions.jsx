import Loading from '@/components/Loading'
import React, { useState, useEffect } from 'react'
import DayFilltersControllers from './DayFilltersControllers'
import axios from '@/lib/axios'
import { toast } from 'react-hot-toast'
import HabitCard from './HabitCard'
import TaskCard from './TaskCard'
import Timer from '../Timer'
import { useContextAPI } from '@/ContextAPI'

function Missions() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()
const {selectedMissionAndLog,setSelectedMissionAndLog} = useContextAPI()
  const [startedMission,setStartedMission] = useState()


  const todayDate = new Date()
  
  const todayNumber = (todayDate.getDay())+1
  
  const [activeDay, setActiveDay] = useState({
    activeDayNumber: todayNumber,
    activeDayDate: todayDate.setHours(0,0,0,0)
  })

  const [missions, setMissions] = useState({
    tasks:{
      upcomming:[],
      passed:[]
    },
    habits:[]
  })
  

  

  useEffect(() => {
    setIsLoading(true)
    axios.get('/missions')
    .then(({data}) =>setData(data))
    .catch((error) =>{
      toast.error('Something went wrong')
      console.error("💣 Error",error)
    })
    .finally(()=>{
      setIsLoading(false)
    })
  },[])


  useEffect(()=>{
    if(!data) return
    const _data = {
      tasks:{
        upcomming:[],
        passed:[]
      },
      habits:[]
    }

    data.forEach((goal)=>{

      goal.Missions.forEach((mission)=>{
        mission.goal  = goal
        if(mission.type == "HABIT"){
          _data.habits = [..._data.habits,mission]
        }else{
          if(mission.date_or_time && ((new Date(mission.date_or_time)).setHours(0,0,0,0) <= todayDate.setHours(0,0,0,0))){
            _data.tasks.passed = [..._data.tasks.passed,mission]
          }else{
            _data.tasks.upcomming = [..._data.tasks.upcomming,mission]
          }
        }
      })
    })

    setMissions(_data)

  },[data])


  const getHabitShowState = (mission) =>{
    if(mission.Days.find(day=>day.number == activeDay.activeDayNumber)) return true
  }



  const toggleCheck = (id,isUpcomming=false)=>{

    let passedOrUpcomming = (isUpcomming)?"upcomming":"passed"
    let _missions = {...missions}
    let task = _missions.tasks[passedOrUpcomming].find(task=>task.id == id)
    task.state = (task.state =="DONE")?null:"DONE";
    updateTasksStateBackend(id,task.state)
    setMissions(_missions);
  }

  const updateTasksStateBackend = (taskId,state) =>{
    axios.put('/missions/'+taskId,{
      state: state
    })
  }

 const updateHabitAchievedValueOnBackend = (id,logId,amount,onDateTime)=>{
    return axios.put('/missions/'+id,{
      type:"HABIT",
      achieved: amount,
      onDate: onDateTime,
      logId: logId, //it may be undifined so backend will create a new entry
    })
 }


  const updateMissionAchievedCount = (missionId,date,sign=1)=>{
    const _missions = {...missions}

    const currentMission = _missions.habits.find(mission =>mission.id==missionId);


    let log = currentMission.DailyLogs.find(log => log.on_date == date)

    console.log("🔒 ",log)
    if(!log){
      if(sign == -1) return;
      log = {on_date:date, achieved:1, mission_id: missionId}
      
      currentMission.DailyLogs = [...currentMission.DailyLogs,log]
    }else{

      if((log.achieved == 0 && sign == -1)) return;

      log.achieved += sign;      
    }

    
    if(currentMission.to_achieve <= log.achieved && sign==1)
    playSound()

    updateHabitAchievedValueOnBackend(missionId,log.id,log.achieved,date).then(({data})=>{
        log.id  = data.id;
        setMissions(_missions);
    })
  }



  

  ///AUDio
  const playSound  = ()=>{
    const audio = new Audio('/audio/success.mp3');
    audio.play();
  }


  //Listen to stop button in timer component
  useEffect(()=>{
    if(!selectedMissionAndLog) return
  if(!selectedMissionAndLog.stop) return;
  stopTimer()
    
  },[selectedMissionAndLog])
  
  const updateMissionAchievedTime = (missionId,date,time)=>{
    const _missions = {...missions}

    const currentMission = _missions.habits.find(mission =>mission.id==missionId);


    let log = currentMission.DailyLogs.find(log => log.on_date == date)

    console.log("🔒 ",log)
    if(!log){

      log = {on_date:date, achieved:time, mission_id: missionId}
      
      currentMission.DailyLogs = [...currentMission.DailyLogs,log]
    }else{
      log.achieved = time;      
    }
    
    // if(currentMission.to_achieve <= log.achieved)
    // playSound()

    updateHabitAchievedValueOnBackend(missionId,log.id,log.achieved,date).then(({data})=>{
        log.id  = data.id;
        setMissions(_missions);
    })
  }

  const stopTimer=()=>{
    //save the data
    updateMissionAchievedTime(
      selectedMissionAndLog.mission.id,
      selectedMissionAndLog.mission.onDate,
      selectedMissionAndLog.achieved)
    
    setSelectedMissionAndLog()
  }

  ///TIMER
  const handleStartTimer = (habit,log)=>{

    //Check if you are trying to start a new timer when there is another one 
    if(selectedMissionAndLog){
      if(!confirm("Are you sure you want to stop "+selectedMissionAndLog.mission.name)) return
      stopTimer()
    }
    habit.onDate =  activeDay.activeDayDate
    setSelectedMissionAndLog({
      mission:habit,
      log:log,
      stop:false,
      achieved:0,
      onDate: activeDay.activeDayDate
    })

  }


  return (
    <div className='w-3/4 mx-auto'>

      {isLoading&&<Loading/>}
      <DayFilltersControllers setActiveDay={setActiveDay} todayNumber={todayNumber} activeDay={activeDay}/>
      
      
      <div className='grid grid-cols-2 mt-20 gap-x-16 '>
        <div className='grid gap-y-5 content-start'>
            <h1 className='text-lg'>Habits</h1>
            {missions.habits.map(mission =>{

              if(getHabitShowState(mission)) return <HabitCard onGoingMission={selectedMissionAndLog} handleStartTimer={handleStartTimer} updateMissionAchievedCount={updateMissionAchievedCount} activeDay={activeDay} habit={mission}/>
            
            })}
   
        </div>
        <div className='grid gap-y-2 content-start'>
            <h1 className='text-lg mb-3'>Tasks</h1>
            {missions.tasks.passed?.sort(t=>t.state?1:-1).map(mission =><TaskCard key={mission.id} toggleCheck={toggleCheck} task={mission}/>)}
            {missions.tasks.upcomming.length?<h2 className="text-sm text-gray-700 mt-4">Upcoming</h2>:""}
            {missions.tasks.upcomming?.sort(t=>t.state?1:-1).map(mission =><TaskCard isUpcomming={true} key={mission.id} toggleCheck={toggleCheck} task={mission}/>)}
        </div>
      </div>

    </div>
  )
}

export default Missions