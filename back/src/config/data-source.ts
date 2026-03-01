import { DataSource } from "typeorm";
import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_SYNC, DB_DROP, DB_LOGGING } from "./envs";
import { User } from "../entities/User.entity";
import { Credential } from "../entities/Credential.entity";
import { Appointment } from "../entities/Appointment.entity";




export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: DB_SYNC,
    dropSchema: DB_DROP,
    logging: DB_LOGGING,
    entities: ["src/entities/*.ts"]
 }) 


 export const UserModel = AppDataSource.getRepository(User)
 export const CredentialModel = AppDataSource.getRepository(Credential)
