import { AppDataSource } from '../config/data-source'
import { Appointment } from '../entities/Appointment.entity'
import { Status } from '../interfaces/Appointments.interface'

 export const AppointmentModel = AppDataSource.getRepository(Appointment).extend( {
    
        validateAppointment:  function (date: Date, time: string) {
            const [hours, minutes] = time.split(':').map(Number)
            const appoinmentDate = new Date(date)
            appoinmentDate.setHours(hours, minutes, 0)

            const appointmentDateInArg = new Date(appoinmentDate.getTime() - 3 * 60 * 60 * 1000) 
            const nowInArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000)

            const dayOfWeek = appointmentDateInArg.getUTCDay()

            
            if (appointmentDateInArg < nowInArg) throw new Error('No se pueden generar citas para fechas pasadas')
            if (dayOfWeek === 5 || dayOfWeek === 6) throw new Error('No se pueden generar citas los fines de semana')
            if (hours < 8 || hours > 17) throw new Error('No se pueden generar citas antes de las 8am o después de las 5pm')
            },

            validateExistAppointment: async function (userId: number, date: Date, time: string) {
               const appointmentFound = await this.findOne({
                    where: {
                        user: { id: userId },
                        date: date,
                        time: time,
                        status:  Status.active
                    }
                })
                if (appointmentFound) {
                    throw new Error(`La cita con fecha: ${date}, y hora: ${time} para el usuario con id: ${userId} ya existe y se ecuentra activa`)
                }
            }


        })


