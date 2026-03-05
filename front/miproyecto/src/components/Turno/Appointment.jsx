import { useContext } from "react"
import Styles from "./Turno.module.css"
import { UsersContext } from "../../context/UsersContext"
import Swal from "sweetalert2"

const Appointment = ({ id, date, time, status }) => {

    const  {cancelAppointment} = useContext(UsersContext)

    const handleCancel = () => {
        cancelAppointment(id)
            .then(() => {
                Swal.fire ({
                    icon:"success",
                    title: "Turno cancelado con exito"
                    })

            })
            .catch (() => {
                Swal.fire ({
                    icon: "success",
                    title: "El turno no pudo cancelarse, intentelo nuevamente"
                })
            })
    }




    return (
        <div className={Styles.appointmentCard}>
            <div className={Styles.appointmentHeader}>
                <h3>Turno #{id}</h3>
                <span className= {status === "Active" ? Styles.statusActive : Styles.statusInactive}>{status}</span>
            </div>
            <div className={Styles.appointmentDetails}>
                <p><strong>Fecha:</strong> <span>{date}</span></p>
                <p><strong>Hora:</strong> <span>{time}</span></p>
        
            </div>
            <button
                className={`${ Styles.cancelButton} ${
                    status === "cancelled" ? Styles.disable : ""
                }`}
                onClick={handleCancel}
                disabled={status === "cancelled"}
                >
        Cancelar Turno
        </button>
            </div>
    )
}   


export default Appointment
