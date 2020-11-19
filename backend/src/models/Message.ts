import  { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('contacts')
export default class Contact {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    contact_id: string;

    @Column()
    contact: string;

    @Column()
    message: string;

    @Column()
    time: string;
}