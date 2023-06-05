import {Pillar,Goal} from "../database/models"
import connection from "@/database/connection";
import Exception from "@/exceptions/Exceptions";
import GoalsRepository from "./GoalsRepository";

export default class PillarsRepository{
   

    constructor(){   
    }


    static  async  format(rawPillar,eagerGoals=false){

        // To eager load the goals only when requested
        let goals = undefined;
        let goalsCount = 0
        if(eagerGoals){
            goals = await rawPillar.getGoals()
            goalsCount = goals.length
        }else{
            goalsCount = await rawPillar.countGoals()
        }
        
        return {
            id: rawPillar.id,
            name: rawPillar.name,
            image: (rawPillar.image)?`/files/${rawPillar.image}`:null,
            goalsCount: goalsCount,
            goals : (rawPillar.Goals)? await Promise.all(rawPillar.Goals.map(async (goal)=>GoalsRepository.format(goal))):null
        }
    }


    async read(user,id){
        const pillar = await Pillar.findOne({
            where:{
                user_id: user.id,
                id: id
            },
            include:[Goal]
        })


        const formatedPillar = await PillarsRepository.format(pillar)
        return formatedPillar;
    }



    async readAll(user){
        const pillars = await Pillar.findAll({
            where:{
                user_id: user.id
            }
        })
        
        const formatedPillars = await Promise.all(pillars.map(async (pillar)=>await PillarsRepository.format(pillar)))
        return formatedPillars;
    }



    async create({user,name,description=null,image}){

        const pillar = await Pillar.create({
            name: name,
            image: image,
            user_id: user.id
        })

        const formatedPillar = await PillarsRepository.format(pillar)
        return formatedPillar;
    }


    async update({id,user,name,image}){

        //if the image == undefined >  user haven't touch the image
        //TODO add the ability to remove the image
        //if null or value remove/update the current

        let pillar = await Pillar.update({ name: name,image:image }, {
            where: {
              user_id: user.id,
              id: id
            }
          });
          //TODO user findone .save() instead
          return this.read(user,id)
    }


    async delete(user,id){
        let pillar = await Pillar.destroy({
            where: {
              user_id: user.id,
              id: id
            }
          });

          return pillar;
    }

}  