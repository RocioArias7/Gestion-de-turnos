import { Router} from "express";
import usersRouter from "./Users.Router";
import appointmentRouter from "./Appointment.Router";

const router: Router = Router();

router.use("/users", usersRouter)
router.use("/appointments", appointmentRouter)

export default router 

