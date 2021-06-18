import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import User from '../../database/models/User'
import SensorDevice from '../../database/models/SensorDevice'
import DataStreamController from '../DataStreamController'

class SensorDeviceController {
    async index (req:Request,res:Response){
        
        const sensorDeviceRepository = getRepository(SensorDevice)
    
        const sensorDevices = await sensorDeviceRepository.find({})
        
        return res.send(sensorDevices)
    }

    async show (req:Request,res:Response){
        try{
            const { id } = req.params;
        
            const sensorDeviceRepository = getRepository(SensorDevice)
        
            const [sensorDevice] = await sensorDeviceRepository.find({ id: Number(id) })

            if(!sensorDevice){
                return res.status(400).json({ error: "SensorDevice not found" });
            }
            else{
                return res.send(sensorDevice)
            }
        }
        catch{
            return res.status(400).json({ error: "SensorDevice authentication failed" });
        }
    }

    async create (req:Request,res:Response){
        try{
            const { key, email, description, label } = req.body
            
            const sensorDeviceRepository = getRepository(SensorDevice)

            const userRepository = getRepository(User)

            if(!email){
                return res.status(400).json({error: "Email não informado"});
            }

            if(!key){
                return res.status(400).json({error: "Chave não informado"});
            }

            const [user] = await userRepository.find({email})

            const [sensorDevice] = await sensorDeviceRepository.find(key)

            if(sensorDevice){
                
                return res.status(400).json(sensorDevice);
            }

            const newSensorDevice = sensorDeviceRepository.create({key, label, description, user_id: user.id})
            await sensorDeviceRepository.save(newSensorDevice)

            return res.json(newSensorDevice) 
            
        }
        catch(err){
            return res.send(err).json({ error: "Não foi possível criar SensorDevice" })
        }        
    }
    
    async delete (req:Request,res:Response){
        const { id } = req.params

        return res.send({
            description: "delete any"
        })
    }
}

export default new SensorDeviceController()
    