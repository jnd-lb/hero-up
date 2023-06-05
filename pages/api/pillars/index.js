import PillarsRepository from "../../../repositories/PillarsRepository";
import getHandler from "../../../lib/nextConnect";

import Exception from "@/exceptions/Exceptions";
import multerMiddleware from "../../../lib/multerMiddeware"
const pillarRepo = new PillarsRepository

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

        console.log("💆‍♀️ Image",req.file,req.file?.filename)

        pillarRepo.create({user:req.user,name:req.body.name, description:req.body.description,image:req.file?.filename })
            .then((pillar) => {
                res.json(pillar)
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

    
        pillarRepo.readAll(req.user)
            .then((pillars) => {
                res.json(pillars)
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
