import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createSensorDevice1623352139547 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'SensorDevice',
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
                    name:'description',
                    type: 'varchar'
                }
            ]
        }))
        await queryRunner.addColumn("SensorDevice", new TableColumn({
            name: "user_id",
            type: "int"
        }));

        await queryRunner.createForeignKey("SensorDevice", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "User",
            onDelete: "CASCADE"
        }));
        
    }
        

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('SensorDevice');
    }

}
