import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('MeasurementUnit')
export default class MeasurementUnit {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    symbol: string

    @Column()
    description: string
}