import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import DataStream from '../../database/models/DataStream'
import MeasurementUnit from '../../database/models/MeasurementUnit'
import SensorData from '../../database/models/SensorData'
import SensorDevice from '../../database/models/SensorDevice'
//import SensorDataController from '../SensorDataController'

class DataStreamController {
    async index (req:Request,res:Response){
        const dataStreamRepository = getRepository(DataStream)
        
        const dataStreams = await dataStreamRepository.find({})

        return res.json(dataStreams)
    }

    async show (req:Request,res:Response){
        try {
            const { id } = req.params;
        
            const dataStreamRepository = getRepository(DataStream)
        
            const [dataStream] = await dataStreamRepository.find({ id: Number(id) })
    
            if(!dataStream){
                return res.status(400).json({ error: "SensorDevice not found" });
            }
            // else{
            //     return res.send(dataStream)
            // }
        }
        catch{
            return res.status(400).json({ error: "DataStream authentication failed" });
        }
    }

    async create (req:Request,res:Response){
        try{
            const { label, key, symbol, enabled } = req.body
            
            const measurementUnitRepository = getRepository(MeasurementUnit)

            const dataStreamRepository = getRepository(DataStream)

            const sensorDeviceRepository = getRepository(SensorDevice)

            if(!key){
                return res.status(400).json({error: "Chave não informado"});
            }

            if(!enabled){
                return res.status(400).json({error: "Enabled não informado"});
            }

            if(!symbol){
                return res.status(400).json({error: "Symbol não informado"});
            }

            const [dataStream] = await dataStreamRepository.find({enabled})

            const [measurementUnit] = await measurementUnitRepository.find({symbol})

            const [sensorDevice] = await sensorDeviceRepository.find({key})

            if(dataStream){
                return res.status(400).json(dataStream);
            }   

            const newDataStream = await dataStreamRepository.create({key, label, enabled, sensorDevice_id: sensorDevice.id, measurementUnit_id: measurementUnit.id})
            await dataStreamRepository.save(newDataStream)   

            return res.json(newDataStream)
        }
        catch{
            return res.status(400).json({ error: "Sorry. Data Stream authentication failed."});
        }
        
    }
    
    async delete (req:Request,res:Response){
        const { id } = req.params

        return res.send({
            description: "delete any"
        })
    }
}

export default new DataStreamController()
    