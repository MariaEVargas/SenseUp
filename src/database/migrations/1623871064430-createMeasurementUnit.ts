import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createMeasurementUnit1623871064430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'MeasurementUnit',
            columns:[
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name:'symbol',
                    type: 'varchar'
                },
                {
                    name:'description',
                    type: 'varchar'
                }
            ],
            
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('MeasurementUnit')
    }

}
