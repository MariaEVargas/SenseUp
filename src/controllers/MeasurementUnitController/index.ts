import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import MeasurementUnit from '../../database/models/MeasurementUnit'
import DataStream from '../../database/models/DataStream'
import SensorDevice from '../../database/models/SensorDevice'

class MeasurementUnitController {
    async index (req:Request,res:Response){
        const measurementUnitRepository = getRepository(MeasurementUnit)
        
        const measurements = await measurementUnitRepository.find({})

        return res.json(measurements)
    }

    async show (req:Request,res:Response){
            
        try{
            const { id } = req.params    

            const measurementRepository = getRepository(MeasurementUnit)

            const [measurementUnit] = await measurementRepository.find({id:Number(id)})

            if(!measurementUnit){
                return res.status(400).json({ error: "MeasurementUnit not found" });
            }
            else{
                return res.send(measurementUnit)
            }
        }
        catch(error){
            return res.status(400).json({ error: "MeasurementUnit authentication failed" });
        }
    }

    async create (req:Request,res:Response){
        try{

            const {symbol, description} = req.body
            
            const measurementUnitRepository = getRepository(MeasurementUnit)

            if(!symbol){
                return res.status(400).json({error: "Symbol não informado"});
            }

            if(!description){
                return res.status(400).json({error: "Description não informada"});
            }

            const [measurementUnit] = await measurementUnitRepository.find({symbol, description})

            if(measurementUnit){
                return res.status(400).json(measurementUnit);
            }

            const newMeasurementUnit = await measurementUnitRepository.create({symbol, description})
            await measurementUnitRepository.save(newMeasurementUnit)

            return res.json(newMeasurementUnit) 

        }
        catch(err){
            return res.send(err).json({ error: "Não foi possível criar MeasurementUnit" })
        }
    }
    
    async delete (req:Request,res:Response){
        const { id } = req.params

        return res.send({
            description: "delete any"
        })
    }
}

export default new MeasurementUnitController()
    