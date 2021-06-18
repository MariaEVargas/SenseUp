import { query } from "express";
import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class createUser1623266814374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'User',
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
                    name:'username',
                    type: 'varchar'
                },
                {
                    name:'email',
                    type: 'varchar'
                }
            ],
            
        }));
        
            
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('User')
    }

}
