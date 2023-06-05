
import { Goal, Day, DailyLog, DayMission, Mission } from "@/database/models"
import {Op} from "sequelize"

export default class MissionsRepository{
    

    constructor(){
        
    }


    //TODO if user want to create log outside start and date bounderies refuse


    static async format(rawMission){
        return {
            id: rawMission.id,
            name: rawMission.name,
            type: rawMission.type,
            measurementType: rawMission.measurement,
            toAchieve: rawMission.to_achieve,
            dateOrTime: rawMission.date_or_time,
            activeDays: rawMission.type=="HABIT"
            ?
                rawMission.Days.map((day)=>day.number)
            :[], 
            daily_logs: rawMission.type=="HABIT"
            ?
                rawMission.DailyLogs
            :[], 
        }
    }

    formatDailyLog (rawData){

        let onDate = null
        if(rawData.on_date){
            let date = new Date(+rawData.on_date)            
            const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
            onDate = date.toLocaleDateString('en-US', options);
        }

        return {
            id:rawData.id,
            name: rawData.name,
            achieved: rawData.achieved,
            onDate: onDate
        }
    }


    async readAll(user){
        //Find all goal 
            //where  state on going 
            // and 
            //today is between start and due day dates bounderises 
            
            const today = new Date()

            const goals = Goal.findAll({ 
                where:{
                    user_id : user.id,
                    start_date: {
                        [Op.lte]: today, // Find goals with start_date less than or equal to today
                      },
                      due_date: {
                        [Op.gte]: today, // Find goals with due_date greater than or equal to today
                      },
                    state : "On Going"
                },
                include:[
                    {model:Mission,
                        include:[Day,DailyLog]
                    }
                ]
            })


            return goals


    }


    async update({id,name,type,dateOrTime,toAchieve,measurementType, activeDays, goalId}){

        const oldMission = await Mission.findOne({
            where:{
                id: id,
                goal_id: goalId,
            }
        })

        console.log("🇸🇳 ",id,goalId, oldMission)

        oldMission.name = name;
        oldMission.type = type;
        oldMission.date_or_time = dateOrTime;
        oldMission.to_achieve = toAchieve;
        //if type is HABIT NOT TASK
        oldMission.measurement = measurementType;
        //state: 


        ///???????????????????? 
        //Remove old days and set new ones 
        
        DayMission.destroy({
            where: {
                mission_id: oldMission.id
            }
        })

        oldMission.save();
        if(type === 'HABIT'){
            //set the active days
            

            for (const dayNumber of activeDays) {
                const day = await Day.findOne({
                    where: {
                        number: dayNumber
                    }
                })

                try{
                
                    // await DayMission.create({
                    //     mission_id: newMission.id,
                    //     day_id: day.id
                    // })
                    oldMission.addDay(day)
                }catch(err){
                    console.log("💣 Day",day)
                    console.log("💣 Mission",newMission)
                    throw err
                }

                
            }
        }
    }

    async read(user,id){
        const mission = await Mission.findOne({
            where:{
                id: id
            },
            include:{
                model:DailyLog,
                where: {
                    achieved: {
                        [Op.ne]:0
                    }
                }
            }
        })

        if(mission){
            
            const _mission = mission.toJSON()
             _mission.DailyLogs = _mission.DailyLogs.map(log=>this.formatDailyLog(log))
             return _mission
        }
        return null
    }

    async updateBulk(missions,goalId){
   
        //miss
        for(const mission of missions){
            if(mission.newMission){
                this.create({...mission,goalId})
            }else{
                this.update({...mission,goalId})
            }

        }
    }



    async updateHabitAchieved(missionId,logid,date,achieved){

        try{
            const [log] = await DailyLog.upsert({
                id:logid,
                mission_id: missionId,
                on_date: date,
                achieved: achieved,
              });

            return log
        }catch(err){
            return err;
        }


    }

    async create({name,type,dateOrTime,toAchieve,measurementType, activeDays, goalId}){

       const newMission = await Mission.create({
            name: name,
            type: type,
            date_or_time: dateOrTime,

            //if type is HABIT NOT TASK
            to_achieve: toAchieve,
            measurement: measurementType,
            //state: 
            goal_id: goalId,
        })
        if(type === 'HABIT'){
            //set the active days
            
            for (const dayNumber of activeDays) {
                try{
                console.log("🚑 ",dayNumber)
                const day = await Day.findOne({
                    where: {
                        number: dayNumber
                    }
                })

                
                    // await DayMission.create({
                    //     mission_id: newMission.id,
                    //     day_id: day.id
                    // })

                    newMission.addDay(day)
                }catch(err){
                    console.log("💣 Day",day)
                    console.log("💣 Mission",newMission)
                    throw err
                }

                
            }
        }
    }


    async deleteBulk(idsArr){
        await Mission.destroy({
            where: {
                id: {[Op.in] : idsArr }
            }
        })
    }


    async updateState(id,state){
    
     let result = await Mission.update({
            state: state
        },
        {
            where: {
                id:id
            }
        }
        )

        return result
    }

}