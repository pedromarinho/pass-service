import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Pass {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serialNumber: string;

    @Column()
    authenticationToken:string

}