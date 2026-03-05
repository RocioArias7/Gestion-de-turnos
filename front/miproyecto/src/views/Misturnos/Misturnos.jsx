import { useContext, useEffect } from "react"
import Appointment from "../../components/Turno/Appointment"
import Styles from "./Misturnos.module.css"
import { UsersContext } from "../../context/UsersContext"
import Swal from "sweetalert2"



function Misturnos(){

    const {getUserAppointments, myApp} = useContext(UsersContext)
    
    useEffect(() => {
        getUserAppointments()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Turnos cargados correctamente"
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Error al cargar los turnos"
                });
        })

        
     
    }, []);


    return (
        <div className={Styles.contenedor}>
            <div className={Styles.contenedorH1}>
                <h1> Mis Turnos </h1>
            </div>

            <div className={Styles.containerTurns}>
                {myApp.length > 0 ? (
                    myApp.map(turno => (
                    <Appointment
                    key={turno.id}
                    id={turno.id}
                    date={turno.date}
                    time={turno.time}
                    status={turno.status}
            />
            ))
        ) : (
            <h1>No hay turnos para mostrar</h1>
        )}
        </div>
        </div>
    )
}


export default Misturnos