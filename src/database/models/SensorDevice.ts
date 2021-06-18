import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('SensorDevice')
export default class SensorDevice {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    key: string

    @Column()
    label: string

    @Column()
    description: string

    @Column()
    user_id: number
}