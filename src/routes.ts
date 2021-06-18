import express from 'express'
import { getRepository } from 'typeorm'
import {
    DataStreamController,
    SensorDataController,
    SensorDeviceController,
    UserController,
    MeasurementUnitController
} from './controllers'


const routes = express.Router()

routes.get('/', (req,res) => {
    res.send('Hello World')
})

routes.get('/User', UserController.index)
routes.get('/User/:id', UserController.show)
routes.post('/User', UserController.create)

routes.get('/SensorDevice', SensorDeviceController.index)
routes.get('/SensorDevice/:id', SensorDeviceController.show)
routes.post('/SensorDevice', SensorDeviceController.create)

routes.get('/DataStream', DataStreamController.index)
routes.get('/DataStream/:id', DataStreamController.show)
routes.post('/DataStream', DataStreamController.create)

routes.get('/SensorData', SensorDataController.index)
routes.get('/SensorData/:id', SensorDataController.show)
routes.post('/SensorData', SensorDataController.create)

routes.get('/MeasurementUnit', MeasurementUnitController.index)
routes.get('/MeasurementUnit/:id', MeasurementUnitController.show)
routes.post('/MeasurementUnit', MeasurementUnitController.create)


export default routes