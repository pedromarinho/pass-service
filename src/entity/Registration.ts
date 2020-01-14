import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Registration {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    deviceId: string;

    @Column()
    passTypeId: string;

    @Column()
    pushToken: string;

    @Column()
    serialNumber: string;

}