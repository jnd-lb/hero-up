import React, { useState, useEffect } from 'react';

const Timer = ({selectedMissionAndLog,setSelectedMissionAndLog}) => {
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  ///AUDio
  const playSound  = ()=>{
    const audio = new Audio('/audio/pop.mp3');
    audio.play();
  }
  useEffect(()=>{
    playSound()
    //??
    if(selectedMissionAndLog.log && selectedMissionAndLog.log.achieved >= 0){
      setSeconds((+selectedMissionAndLog.log.achieved) * 60)
    }
  },[])

  useEffect(() => {
    let interval = null;

    if (!isPaused) {
      interval = setInterval(() => {

        setSeconds(prevSeconds => {
          let mins =prevSeconds/60
          
          console.log(parseInt(mins),selectedMissionAndLog.achieved)
          if(parseInt(mins)>selectedMissionAndLog.achieved){
              setSelectedMissionAndLog(m=>{
                return {...m, achieved:parseInt(mins)}
              })  
          }
          return prevSeconds + 1
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const callFunction = () => {
      // Function to be called every 5 minutes
      console.log('Calling the function...');
    };

    const interval = setInterval(callFunction, 5 * 60 * 1000); // Call the function every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handlePause = () => {
    setIsPaused(prevIsPaused => !prevIsPaused);
  };

  return (
    <div className="w-screen left-0 bg-gradient-to-r from-sky-500 to-sky-600 fixed bottom-0 z-40 flex justify-between py-2 h-16 px-16">
      <div className=''>
        <h1 className='m-0 p-0 text-white font-bold text-2xl'>{selectedMissionAndLog?.mission?.name}</h1>
        <span className='text-sm -mt-1 block text-white font-light'>{selectedMissionAndLog?.mission?.goal.name}</span>
      </div>
      {/*Timer*/}
      <div className='w-1/4 flex items-center gap-10'>
        <div className='flex items-end gap-2'>
          <h1 className="text-5xl text-white">{formatTime(seconds)}</h1> <span className="font-thin text-white">/{selectedMissionAndLog?.mission?.to_achieve}</span>
        </div>
        
        <div className='text-white text-3xl'>
          {isPaused ? 
            <i onClick={handlePause} className="bi bi-play cursor-pointer"></i>
            : 
            <i onClick={handlePause} className="bi bi-pause cursor-pointer"></i>
          }

           <i onClick={()=>{setSelectedMissionAndLog({...selectedMissionAndLog,stop:true})}} className="bi bi-stop-fill ms-4 cursor-pointer"></i>
        </div>

      </div>

    </div>
  );
};

export default Timer;
