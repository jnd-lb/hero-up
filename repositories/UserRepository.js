import {User} from "../database/models"
import Exception from "@/exceptions/Exceptions";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export default class UserRepository{
  //User;
  
  constructor(){
    //this.User = UserModel(connection)
  }

  formatUser(raw){

    return {
      id: raw.id,
      firstName: raw.first_name,
      lastName: raw.last_name,
      image: `/images/profiles/${raw.image?raw.image:"placeholder.jpg"}`,
      bio: raw.bio||"I'm using Hero Up",
      email: raw.email,
      dob: raw.dob
    }
  }

    userToToken(user){
        if (!process.env.JWT_SECRET) {
          throw new Error('Add JWT SEcret to .env.local')
        }
  
          var token = jwt.sign({
          user
             }, process.env.JWT_SECRET, { /*algorithm: 'RS256',*/expiresIn:'30d' });
          
            return token
        }
  
  
  
      async tokenToUser(token) {
  
        if(!process.env.JWT_SECRET){
            throw new Error('No jwt secret found')
        }
  
       return await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          
            if (err) {
              return false
            }
            
            return decoded;
        })
  
    }








    async login({email,password}){
      //TODO validate
      
      //sequilize

        const user = await User.findOne({
          where:{
            email:email
          },
          limit: 1,
        })

      if(!user) throw new Exception("No User with email is found",401,"no_email")

      if(! (await bcrypt.compare(password, user.password))){
        throw new Exception("Wrong password",401,"wrong_password")
      }

      let formatedUser = this.formatUser(user);
      let token = await this.userToToken(formatedUser)
      formatedUser.token = token;

      return formatedUser
    }



    async signUp({firstName,lastName,email,password,bio}){
      //validate

      //sequilize
      const user = await User.create({
        first_name:firstName,
        last_name:lastName,
        email:email,
        password:password,
        bio:bio
      });

      let formatedUser = this.formatUser(user);
      let token = await this.userToToken(formatedUser)
      formatedUser.token = token;

      return formatedUser
    }
  

}