 import UserRepository from "../../../repositories/UserRepository";
 import Exception from "../../../exceptions/Exceptions"
 import { serialize } from "cookie";
import getHandler, {cookieConfig} from "../../../lib/nextConnect"

 const userRepo = new UserRepository

export default getHandler()
    //We should give it the pattern to extract the slug
    .post((req, res) => {
        userRepo.signUp({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                bio: req.body.bio
            })
            .then((user) => {
                const serialized = serialize('token', user.token, cookieConfig);
                res.setHeader('Set-Cookie', serialized);
                res.json(user); 
            }).catch(err=>{
                
                 res.status(400)

                // if(err instanceof Exception)
                //   res.status(err.code)
                
              res.json({error:"error",message:err});
            })
    })
