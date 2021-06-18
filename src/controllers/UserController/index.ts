import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '../../database/models/User'



class UserController {
    async index (req:Request,res:Response){
        const userRepository = getRepository(User)

        const users = await userRepository.find()

        return res.send(users)
    }

    async show (req:Request,res:Response){
        try{
            const { id } = req.params;
        
            const userRepository = getRepository(User)

            const [user] = await userRepository.find({ id: Number(id) })
            
            if(!user){
                return res.status(400).json({ error: "User not found" });
            }
            else{
                return res.send(user)
            }
            
        }
        catch (err) {
            return res.status(400).json({ error: "User authentication failed" });
        }
    }

    async create (req:Request,res:Response){
        try{
            const { username, email } = req.body

            const userRepository = getRepository(User)

            if(!username){
                return res.status(400).json({error: "Username não informado"});
            }

            if(!email){
                return res.status(400).json({error: "Email não informado"});
            }

            const [user] = await userRepository.find({username, email})
            
        
            if(user){
                return res.status(400).json(user);
            }

            
            const newUser = await userRepository.create({username, email})
            await userRepository.save(newUser)

            return res.json(newUser)            
            
        }
        catch(err){
            console.log("Error:", err);
            res.status(500).json({ error: "Cannot register user at the moment!" });
        }
        // return res.send({
        //     description: "create any"
        // })
    }
    
    async delete (req:Request,res:Response){
        const { id } = req.params

        return res.send({
            description: "delete any"
        })
    }
}

export default new UserController()
    