import { Request, Response, Router } from "express";
import { cancelAppointmentController, getAppointmentByIdController, getAppointmentsController, scheduleAppointmentController } from "../controllers/Appointments.Controller";
import { ScheduleAppoinmentDTO } from "../DTO/Appointment.DTO";

const appointmentRouter: Router = Router()

appointmentRouter.get("/", (req: Request, res: Response) => getAppointmentsController(req, res));

appointmentRouter.get("/:id", (req: Request<{id: string}>, res: Response) => getAppointmentByIdController(req, res));

appointmentRouter.post("/schedule", (req: Request<unknown, unknown, ScheduleAppoinmentDTO>, res: Response) => scheduleAppointmentController(req, res));

appointmentRouter.put("/cancel/:id", (req: Request<{id: string}>, res: Response) => cancelAppointmentController(req, res));

export default appointmentRouter  