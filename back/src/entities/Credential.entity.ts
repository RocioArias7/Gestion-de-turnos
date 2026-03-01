import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User.entity"   


@Entity("credentials")
export class Credential {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 100, nullable: false, unique: true})
    username: string

    @Column({type: "varchar", nullable: false})
    password: string


@OneToOne(() => User)
    user: User

}