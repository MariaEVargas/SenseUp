import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('SensorData')
export default class SensorData {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    timestamp: string

    @Column()
    value: string

    @Column()
    dataStream_id: number

    @Column()
    measurementUnit_id: number
}