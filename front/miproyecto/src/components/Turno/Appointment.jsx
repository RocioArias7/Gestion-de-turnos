import Styles from "./Turno.module.css"

const Appointment = ({ id, date, time, status }) => {
    return (
        <div className={Styles.appointmentCard}>
            <div className={Styles.appointmentHeader}>
                <h3>Turno #{id}</h3>
                <span className= {status === "Active" ? Styles.statusActive : Styles.statusInactive}>{status}</span>
            </div>
            <div className={Styles.appointmentDetails}>
                <p><strong>Fecha:</strong> {date}</p>
                <p><strong>Hora:</strong> {time}</p>
        
            </div>
        </div>
    )
}   


export default Appointment
