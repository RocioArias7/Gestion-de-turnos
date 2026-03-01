import { useEffect, useState } from "react"
import Appointment from "../../components/Turno/Appointment"
import Styles from "./Misturnos.module.css"
import axios from "axios"


function Misturnos(){
    const [myApp, setMyApp] =  useState([])
    
    useEffect(() => {
        axios.get ("http://localhost:3000/appointments")
        .then((info) => {
            setTimeout(( ) => {
             setMyApp(info.data.data)
            }, 4000)

    })
        .catch(err => console.log(err))


    }, [])


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
            <p>Cargando...</p>
        )}
        </div>
    </div>
    )
}


export default Misturnos