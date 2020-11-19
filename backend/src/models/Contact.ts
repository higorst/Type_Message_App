import  { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('contacts')
export default class Contact {
    @PrimaryColumn()
    id: string;

    @Column()
    user: string;

    @Column()
    password: string;

    @Column()
    image: string;
}