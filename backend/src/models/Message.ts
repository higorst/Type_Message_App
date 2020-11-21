import  { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('messages')
export default class Message {
    @PrimaryGeneratedColumn('increment')
    id_message: number;

    @Column()
    id_contact: string;

    @Column()
    user_contact: string;

    @Column()
    image_contact: string;

    @Column()
    id: string; //who is receiving

    @Column()
    message: string;

    @Column()
    contact: string;

    @Column()
    time: string;
}