import { Request, Response } from "express";
import { LoginUserDTO, RegisterUserDTO } from "../DTO/User.DTO";
import { getUserByIdService, getUsersService, loginUserService, registerUserService } from "../services/Users.service";
import { PostgresError } from "../interfaces/ErrorInterface";

export const getUsersController = async (req: Request, res: Response) => {
const users = await getUsersService()
    res.status(200).json({
        data: users,
        msg: "Obtener el listado de todos los usuarios"
    })
}

export const getUserByIdController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const user = await getUserByIdService(+req.params.id)
    res.status(200).json(user)
    } catch (error) {
        res.status(404).json({
        msg: error instanceof Error ? error.message : "Error desconocido"
    })
}
  
}

export const resgisterUserController = async (req: Request< unknown, unknown, RegisterUserDTO>, res: Response) => {
    try {
      await registerUserService(req.body)
      res.status(201).json({
        msg:"Registro de un nuevo usuario exitoso"
    })   
    } catch (error) {
        const nuevoError = error as PostgresError
        res.status(400).json({
            msg:  nuevoError.detail ? nuevoError.detail : nuevoError instanceof Error ? nuevoError.message : "Error desconocido"
        })
    }
   
}

export const loginUserController = async (req: Request< unknown, unknown, LoginUserDTO >, res: Response) => {
    try {
        const userFound = await loginUserService(req.body)
        res.status(200).json({
            login: true,
            user: userFound
        })
    } catch (error) {
        const nuevoError = error as PostgresError
        res.status(400).json({
            msg:  nuevoError.detail ? nuevoError.detail : nuevoError instanceof Error ? nuevoError.message : "Error desconocido"
        })
    }

}