import getHandler from "../../../lib/nextConnect";
import Exception from "@/exceptions/Exceptions";
import MissionsRepository from "@/repositories/MissionsRepository";


const missionsRepo = new MissionsRepository

export default getHandler()    
    //🔴 To BE USED in routes that expect to receive multipart/form-data
.get((req, res) => {
    missionsRepo.readAll(req.user)
            .then((goals) => {
                res.json(goals)
            }).catch(err=>{
                res.status(400)
                if(err instanceof Exception){
                    res.status(err.code)
                    res.json(err);
                    return
                }
                res.json(new Exception("Internal Error", 400, err.message));
            })
    })
