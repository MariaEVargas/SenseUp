import express, { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import DataStream from '../../database/models/DataStream'
import MeasurementUnit from '../../database/models/MeasurementUnit'
import SensorData from '../../database/models/SensorData'
import DataStreamController from '../DataStreamController'

class SensorDataController {
    async index (req:Request,res:Response){
        
        const sensorDataRepository = getRepository(SensorData)

        const sensorData = await sensorDataRepository.find({})

        return res.json(sensorData)
    }

    async show (req:Request,res:Response){
        try{
            const { id } = req.params;
        
            const sensorDataRepository = getRepository(SensorData)
        
            const [sensorData] = await sensorDataRepository.find({id: Number(id)})

            if(!sensorData){
                return res.status(400).json({ error: "SensorData not found" });
            }
            else{
                return res.send(sensorData)
            }
        }
        catch{
            return res.status(400).json({ error: "SensorData authentication failed" });
        }


        // return res.send({
        //     description: "show only"
        // })
    }

    async create (req:Request,res:Response){
        try{
            const {symbol, timestamp, value} = req.body
            const sensorDataRepository = getRepository(SensorData)

            const dataStreamRepository = getRepository(DataStream)

            const measurementUnitRepository = getRepository(MeasurementUnit)

            const [measurementUnit] = await measurementUnitRepository.find({symbol})

            if (!measurementUnit){
                return res.status(400).json({erro:"Não foi possível encontrar measurementUnit no repositório"})
            }
            
            const enabled = true
            
            const [dataStream] = await dataStreamRepository.find({enabled})

            if (dataStream.enabled == true){
                const newSensorData = await sensorDataRepository.create({timestamp,value, dataStream_id: dataStream.id, measurementUnit_id: measurementUnit.id} )
                await sensorDataRepository.save(newSensorData)
                return res.send(newSensorData)
            }
            else{
                return res.send({erro:"Esta stream não está ativa."});
            }
        }

        catch{
            return res.send().json({ error: "Sorry. Unable to receive sensors data" });
        }
    }
        

    
    async delete (req:Request,res:Response){
        const { id } = req.params

        return res.send({
            description: "delete any"
        })
    }
}

export default new SensorDataController()
    