import { EntityManager } from "typeorm";
import { AppDataSource, UserModel } from "../config/data-source";
import { LoginUserDTO, RegisterUserDTO, UserResponseDTO } from "../DTO/User.DTO";
import { Credential } from "../entities/Credential.entity";
import { User } from "../entities/User.entity";
import { checkCredentials, createCredentialService } from "./Credential.service";


export const getUsersService = async (): Promise<User[]> => {
    return await UserModel.find()
}

export const getUserByIdService = async (id: number): Promise<User> => {
    const userFound: User | null = await UserModel.findOne({
        where: {
            id: id
        },
        relations: ["appointments"]
    })
    if(!userFound) throw Error(`El usuario con id ${id} no fue encontrado`)
    return userFound
}


export const registerUserService = async (userData: RegisterUserDTO) => {

    await AppDataSource.transaction( async (entityManager) => {
            const newCredential: Credential = await createCredentialService(entityManager, userData.username, userData.password)

            const newUser: User = entityManager.create(User, { 
                name: userData.name,
                birthdate: userData.birthdate,
                email: userData.email,
                nDni: userData.nDni,
                credentials: newCredential
            })
            await entityManager.save(newUser)
        })      
}


export const loginUserService = async (userData: LoginUserDTO) => {
    const crendetialId = await checkCredentials (userData.username, userData.password)
    const userFound = await UserModel.findOne({
        where: {
            credentials: {
                id: crendetialId
            }
        }
     })
     return userFound
}


