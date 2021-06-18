import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createSensorData1623433610331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'SensorData',
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
                    name:'timestamp',
                    type: 'datetime'
                },
                {
                    name:'value',
                    type: 'double'
                }
            ]
        }));
        
        await queryRunner.addColumn("SensorData", new TableColumn({
            name: "dataStream_id",
            type: "integer"
        }));
        
        await queryRunner.createForeignKey("SensorData", new TableForeignKey({
            columnNames: ["dataStream_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "DataStream",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("SensorData", new TableColumn({
            name: "measurementUnit_id",
            type: "integer"
        }));
        
        await queryRunner.createForeignKey("SensorData", new TableForeignKey({
            columnNames: ["measurementUnit_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "MeasurementUnit",
            onDelete: "CASCADE"
        }));
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('SensorData');
    }

}
