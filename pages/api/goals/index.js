import GoalRepository from "../../../repositories/GoalsRepository";
import getHandler from "../../../lib/nextConnect";
import Exception from "@/exceptions/Exceptions";
import multerMiddleware from "../../../lib/multerMiddeware"


const goalsRepository = new GoalRepository

//🔴 To BE USED in routes that expect to receive multipart/form-data
export const config = {
    api: {
        bodyParser: false,
    },
}

export default getHandler()    
    //🔴 To BE USED in routes that expect to receive multipart/form-data
    .use(multerMiddleware("image"))

    //We should give it the pattern to extract the slug
    .post((req, res) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>",req.body)
        goalsRepository.create(
            {
                user:req.user,
                name:req.body.name,
                startDate:req.body.startDate,
                dueDate:req.body.dueDate,
                state:req.body.state,
                pillarId:req.body.pillarId,
                image:req.file?.filename,
                missions: req.body.missions
            })
            .then((goal) => {
                res.json(goal)
            }).catch(err=>{
                res.status(400)

                if(err instanceof Exception){
                    res.status(err.code)
                    res.json(err);
                    return
                }
                res.json(new Exception("Internal Error", 400, err.message));
            })

    }).get((req, res) => {
        goalsRepository.readAll(req.user)
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
