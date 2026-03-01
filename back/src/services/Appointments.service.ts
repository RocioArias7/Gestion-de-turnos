
import { ScheduleAppoinmentDTO } from "../DTO/Appointment.DTO";
import { Appointment } from "../entities/Appointment.entity";
import { Status } from "../interfaces/Appointments.interface";
import { AppointmentModel } from "../repositories/Appointment.repository";
import { getUserByIdService } from "./Users.service";


export const getAppointmentService = async (): Promise<Appointment[]> => {
    return await AppointmentModel.find()
}
    
export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
        const appointmentFound: Appointment | null = await AppointmentModel.findOne({
            where: {
                id: id
            }
        })
        if (!appointmentFound) throw new Error(`No se encontro la cita con id ${id}`)
        return appointmentFound
    }



export const registerAppointmentService = async (appointment: ScheduleAppoinmentDTO): Promise<Appointment> => {

    AppointmentModel.validateAppointment(appointment.date, appointment.time)
    await AppointmentModel.validateExistAppointment(appointment.userId, appointment.date, appointment.time)

        const user = await getUserByIdService(appointment.userId)
        const newApp: Appointment = AppointmentModel.create({
            date: appointment.date,
            time: appointment.time,
            user: user
        })

        return  await AppointmentModel.save(newApp)
       
    }

    

    export const cancelAppointmentService = async (id: number) => {
        const appFound = await getAppointmentByIdService(id)
        appFound.status = Status.cancelled
        await AppointmentModel.save(appFound)
       
    }