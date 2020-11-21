import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createMessages1605735661748 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(new Table({
                name: 'messages',
                columns: [
                    {
                        name: 'id_message',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'id_contact',
                        type: 'varchar',
                    },
                    {
                        name: 'user_contact',
                        type: 'varchar',
                    },
                    {
                        name: 'image_contact',
                        type: 'varchar',
                    },
                    {
                        name: 'id',
                        type: 'varchar',
                    },
                    {
                        name: 'message',
                        type: 'varchar',
                    },
                    {
                        name: 'contact',
                        type: 'varchar',
                    },
                    {
                        name: 'time',
                        type: 'varchar',
                    },
                ]
            }))
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('messages')
    }

}
