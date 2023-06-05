import {Pillar,Goal,Mission,Day, DayMission} from "../database/models"
import connection from "@/database/connection";
import Exception from "@/exceptions/Exceptions";
import PillarsRepository from "./PillarsRepository";
import { dateFormater,daysLeftFromDate } from "@/util/datehelper";
import MissionsRepository from "./MissionsRepository";

export default class GoalsRepository{
   

    constructor(){   
    }


    static async format(rawGoal){
        // To eager load the goals only when requested
        return {
            id: rawGoal.id,
            name: rawGoal.name,
            pillarId: rawGoal.pillar_id,
            image: (rawGoal.image)?`/files/${rawGoal.image}`:null,
            pillar: rawGoal.Pillar? 
                {name:rawGoal.Pillar.name,id:rawGoal.Pillar.id}
                :null,
            startDate: rawGoal.start_date,
            formatedStartDate: dateFormater(rawGoal.start_date),
            dueDate: rawGoal.due_date,
            formatedDueDate: dateFormater(rawGoal.due_date),
            state: rawGoal.state,
            daysLeft : daysLeftFromDate(rawGoal.due_date), //TODO Calculate  ,

            missions : rawGoal.Missions
                        ? await Promise.all(rawGoal.Missions.map( async (mission)=>await MissionsRepository.format(mission)))
                        : null
        }

    }


    async read(user,id){
        const goal = await Goal.findOne({
            where:{
                user_id: user.id,
                id: id
            },
            include: [
                {model: Pillar},
                {model: Mission, include: [Day]},
              ]
              
            //include: [Pillar, Mission]
        })

        if(!goal) throw "No such goal"
        const formatedGoal = await GoalsRepository.format(goal)
        return formatedGoal;
    }

    


    async readAll(user){
        const goals = await Goal.findAll({
        where:{
            user_id : user.id
        },
          include: Pillar
        })
        
        const formatedGoals = await Promise.all(goals.map(async (goal)=>await GoalsRepository.format(goal)))
        return formatedGoals;
    }



    async create({user,name,startDate,dueDate, state, pillarId,image,missions}){
        
        const goal = await Goal.create({
            name: name,
            image: image,
            user_id: user.id,
            start_date: startDate,
            due_date: dueDate,
            state: state,
            pillar_id: pillarId
        })


        //Create Missions
        let missionsArr = JSON.parse(missions)

        const missionRepo = new MissionsRepository

        for(const mission of missionsArr){
            await missionRepo.create({...mission,goalId:goal.id})
        }

        const formatedGoal = await GoalsRepository.format(goal)
        return formatedGoal;
    }


    async update({id,user,name,startDate,dueDate, state, pillarId,image,missions,deletedMissions}){

        //if the image == undefined >  user haven't touch the image
        //TODO add the ability to remove the image
        //if null or value remove/update the current

        let goal = await Goal.update(
            {
                name: name,
                image: image,
                user_id: user.id,
                start_date: startDate,
                due_date: dueDate,
                state: state,
                pillar_id: pillarId
            },{
            where:{
                user_id: user.id,
                id: id
            }})


        //update missions

        const missionRepo = new MissionsRepository

        const deletedMissionsArr = JSON.parse(deletedMissions)
        missionRepo.deleteBulk(deletedMissionsArr)


        let missionsArr = JSON.parse(missions)
        await missionRepo.updateBulk(missionsArr,id)
        
        return this.read(user,id)
    }


    async delete(user,id){
        let goal = await Goal.destroy({
            where: {
              user_id: user.id,
              id: id
            }
          });

          return goal;
    }

}  