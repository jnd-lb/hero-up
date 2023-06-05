import UserRepository from "../../../repositories/UserRepository";
import getHandler, { cookieConfig } from "../../../lib/nextConnect";

import { serialize } from "cookie";
import Exception from "@/exceptions/Exceptions";

const userRepo = new UserRepository

export default getHandler()
    //We should give it the pattern to extract the slug
    .post((req, res) => {
        userRepo.login({email:req.body.email, password:req.body.password})
            .then((user) => {
                const serialized = serialize('token', user.token, cookieConfig);
                res.setHeader('Set-Cookie', serialized);
                res.json(user); 
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
