import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Pass } from './Pass';

@Entity()
export class Registration {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    deviceId: string;

    @Column()
    pushToken: string;

    @OneToOne(type => Pass)
    @JoinColumn()
    pass: Pass;

}