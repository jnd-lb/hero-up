import getHandler from "../../../lib/nextConnect";
import Exception from "@/exceptions/Exceptions";
import MissionsRepository from "@/repositories/MissionsRepository";


const missionRepo = new MissionsRepository

export default getHandler()    
.put((req,res)=>{
    if(req.body.type === 'HABIT'){
        missionRepo.updateHabitAchieved(req.query.id,req.body.logId,req.body.onDate,req.body.achieved).then((amount)=>{
            res.json(amount);
        })
    }else{
        //Task 
        missionRepo.updateState(req.query.id,req.body.state).then((state)=>{
            res.json(state);
        })
    }
}).get((req,res)=>{
        missionRepo.read(req.user,req.query.id).then((mission)=>{
            res.json(mission);
        }).catch(err=>{
            res.statusCode = 400;
            res.json(new Exception("Internal error",400,err.message));
        })
})