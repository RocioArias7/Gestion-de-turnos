import { Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User.entity"
import { Status } from "../interfaces/Appointments.interface"

@Entity("appointments")
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number


    @Column({type: "date", nullable: false})
    date: Date

    @Column({type: "varchar", length: 5, nullable: false})
    time: string

    @ManyToOne(() => User, user => user.appointments, {nullable: false})
    @JoinColumn()
    user: User

    @Column({type: "varchar", length: 10, nullable: false, default: Status.active})
    status: Status


    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

}