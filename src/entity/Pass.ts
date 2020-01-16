import { Entity, PrimaryGeneratedColumn, Column, Unique, UpdateDateColumn } from "typeorm";

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

    @UpdateDateColumn()
    updatedAt: number;

}