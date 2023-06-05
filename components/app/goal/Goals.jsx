import { useContextAPI } from '@/ContextAPI'
import FloatingButton from '@/components/ui/FloatingButton';
import axios from '@/lib/axios';
import React, { useEffect, useState } from 'react'
import GoalCard from './GoalCard';
import FilterContainer from '@/components/ui/form/FilterContainer';
import Dropdown from '@/components/ui/form/FilterDropdown';
import goal from '@/pages/app/goal';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

function Goals() {
  const { selectedPillar, setSelectedPillar } = useContextAPI();

  const [goals, setGoals] = useState()
  const [filterdGoals, setFilterdGoals] = useState([])


  const [pillarfilteringOptions, setPillarFilteringOptions] = useState([])
  const stateFilteringOptions = [
    {
      label: "All States",
      value: "All States"
    },
    {
      label: "On Hold",
      value: "On Hold"
    },
    {
      label: "Completed",
      value: "Completed"
    },
    {
      label: "On Going",
      value: "On Going"
    }
  ]

  const [filteringCriteria, setFilteringCriteria] = useState({})


  //get pillars

  useEffect(() => {
    axios.get("/pillars")
      .then(({ data }) => {
        setPillarFilteringOptions([{ label: "All Pillars", value: 0 }, ...data.map(element => {
          return { value: element.id, label: element.name }
        })]);
      })
      .catch(err => {
      })
  }, [])


  useEffect(() => {
    axios.get("/goals")
      .then(({ data }) => {
        setGoals(data);
        setFilterdGoals(data)
      })
      .catch(err => {

      })
  }, [])


  //Filtering
  useEffect(() => {
    if(!goals) return

    let _filterdGoals = [...goals]

    //Filter by pillar
    if (filteringCriteria.pillar && filteringCriteria.pillar != 0) {
      _filterdGoals = [..._filterdGoals.filter(goal => {
        return goal.pillar?.id == filteringCriteria.pillar
      })]
    }

    //Filter by pillar
    if (filteringCriteria.state && filteringCriteria.state != "All States") {
      _filterdGoals = [..._filterdGoals.filter(goal => {
        return goal.state == filteringCriteria.state
      })]
    }

    setFilterdGoals(_filterdGoals)
    }, [filteringCriteria])



  const handleFilterChange = (e,criteria) => {
    let _filterCriteria = {...filteringCriteria}
    _filterCriteria[criteria] = e.target.value
    setFilteringCriteria(_filterCriteria)
  }

  const handleDelete  = (goalId)=>{
      axios.delete("/goals/"+goalId).then(()=>{
        
        setGoals([...goals.filter(goal=>goal.id!=goalId)])
        setFilterdGoals([...filterdGoals.filter(goal=>goal.id!=goalId)])
        

        toast.success('Goal Deleted Successfully')})
  }

  ///AUDio
  const playSound  = ()=>{
    const audio = new Audio('/audio/pop.mp3');
    audio.play();
  }

  const showToast = (e) =>{
    setTimeout(() =>{
      playSound()
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-sky-500 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4 relative">
              <i  onClick={() => toast.dismiss(t.id)} className="cursor-pointer bi bi-x-lg text-white absolute right-6"></i>
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="/images/goal-icon.png"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">
                  Heads Up!
                </p>
                <p className="mt-1 text-sm text-white">
                  Nice! You are about creating your new goal.
                  <br/>
                  <br/>
                  Make sure that your goal meets the SMART goal principle (Specific, Measurable, Achievable, Realistic, and Timely).
                  <br/> 
                  <Link className='underline' href="https://www.google.com/search?q=smart+goals+definition&hl=en&sxsrf=APwXEdcgm9NfiKBo_GTeF57QiV7q8JQQ5g%3A1685736107166&source=hp&ei=q0p6ZNWzBr-ekdUPpb6j2AE&iflsig=AOEireoAAAAAZHpYu08J1VQKC2Q42C3KGpKMIfPAeFJX&oq=smart+goals+&gs_lcp=Cgdnd3Mtd2l6EAMYATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BgizARCFBDoKCC4QAxCPARDqAjoLCAAQigUQsQMQgwE6CwguEIAEELEDEIMBOggIABCKBRCxAzoLCAAQgAQQsQMQgwE6CwguEIoFELEDEIMBOhEILhCKBRCxAxCDARDHARDRAzoICAAQgAQQsQM6DgguEIAEELEDEMcBENEDOgUILhCABDoXCC4QgAQQsQMQgwEQxwEQrwEQmAUQmQU6DgguEIAEELEDEIMBENQCOhcILhCDARCvARDHARCxAxCABBCYBRCZBToUCC4QgAQQsQMQgwEQxwEQ0QMQ1AI6DQgAEIAEELEDEIMBEAo6CggAEIAEELEDEAo6EAguEIAEELEDEIMBENQCEAo6FgguEIAEELEDEIMBEMcBENEDENQCEAo6EAguEIAEELEDEMcBENEDEAo6DQguEIAEEMcBEK8BEAo6CwguEIAEEMcBEK8BOgsILhCvARDHARCABFCiAVjSPGCLSWgFcAB4AYAB2gmIAa0nkgEJMC45LjIuNy0zmAEAoAEBsAED&sclient=gws-wiz" target='_blank'>Learn more</Link>
                </p>
              </div>
            </div>
            
          </div>
        </div>
      ),{
        position:"bottom-right",
        duration:15000
      })
    },1000)
  }

  return (
    <div className='grid grid-cols-4 gap-7'>
      {
        (!filterdGoals.length) ? <h1>No goals</h1>
          : filterdGoals.map(goal => <GoalCard handleDelete={handleDelete} goal={goal} key={goal.id} />)
      }
      <FloatingButton label="+" link="/app/goal" onClick={showToast}/>

      <div className="fixed left-16 top-28 flex gap-4 z-50">
        {/**Filter by pillar */}
        <FilterContainer>
          <Dropdown options={pillarfilteringOptions} onChange={(e)=>handleFilterChange(e,'pillar')} />
        </FilterContainer>

        {/**Filter by state */}
        <FilterContainer>
          <Dropdown options={stateFilteringOptions} onChange={(e)=>handleFilterChange(e,'state')} />
        </FilterContainer>
      </div>
    </div>
  )
}

export default Goals