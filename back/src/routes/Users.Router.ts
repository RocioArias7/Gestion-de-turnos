import { Request, Response, Router } from "express";
import { getUsersController, getUserByIdController, loginUserController, resgisterUserController } from "../controllers/Users.Controller";
import { LoginUserDTO, RegisterUserDTO } from "../DTO/User.DTO";

const usersRouter: Router = Router();

usersRouter.get("/", (req: Request, res: Response) => getUsersController(req, res));

usersRouter.get("/:id", (req: Request< { id: string } >, res: Response) => getUserByIdController(req, res));

usersRouter.post("/register", (req: Request< unknown, unknown, RegisterUserDTO>, res: Response) => resgisterUserController(req, res));

usersRouter.post("/login", (req: Request< unknown, unknown, LoginUserDTO >, res: Response) => loginUserController(req, res))


export default usersRouter 
