import { Entity, Column, PrimaryGeneratedColumn, Double} from 'typeorm'

@Entity('DataStream')
export default class DataStream {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    key: string

    @Column()
    label: string

    @Column()
    enabled: boolean

    @Column()
    sensorDevice_id: number

    @Column()
    measurementUnit_id: number
}