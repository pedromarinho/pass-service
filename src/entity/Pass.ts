import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(["passTypeId", "serialNumber"])
export class Pass {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    passTypeId: string;

    @Column()
    serialNumber: string;

    @Column()
    authenticationToken: string

    @Column()
    updatedAt: Date;

}