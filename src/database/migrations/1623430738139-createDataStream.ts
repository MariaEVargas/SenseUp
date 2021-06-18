import {Column, MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createDataStream1623430738139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'DataStream',
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
                    name:'key',
                    type: 'varchar'
                },
                {
                    name:'label',
                    type: 'varchar'
                },
                {
                    name:'enabled',
                    type: 'boolean'
                }
            ]
        }));

        await queryRunner.addColumn("DataStream", new TableColumn({
            name: "sensorDevice_id",
            type: "integer"
        }));

        await queryRunner.createForeignKey("DataStream", new TableForeignKey({
            columnNames: ["sensorDevice_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "SensorDevice",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("DataStream", new TableColumn({
            name: "measurementUnit_id",
            type: "integer"
        }));
        
        await queryRunner.createForeignKey("DataStream", new TableForeignKey({
            columnNames: ["measurementUnit_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "MeasurementUnit",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('DataStream');
    }

}
