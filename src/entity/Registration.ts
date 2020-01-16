import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pass } from './Pass';

@Entity()
export class Registration {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    deviceId: string;

    @Column()
    pushToken: string;

    @ManyToOne(type => Pass, pass => pass.registrations)
    pass: Pass;

}