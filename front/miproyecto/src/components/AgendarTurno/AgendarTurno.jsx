import Styles from "./AgendarTurno.module.css"
import Swal from "sweetalert2"
import { useFormik } from "formik"
import { dateTimeValidates } from "../../helpers/validates"
import { useContext } from "react"
import { UsersContext } from "../../context/UsersContext"



function AgendarTurno() {
    const { scheduleAppointment } = useContext(UsersContext)

    const formik = useFormik({
        initialValues: {
            date: "",
            time: "",
        },
        validate: dateTimeValidates,
        initialErrors: {
            date: "La fecha es requerida",
            time: "La hora es requerida"
        },
            onSubmit: (values) => {
                scheduleAppointment(values)
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Turno agendado correctamente"
                    });
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Error al agendar el turno"
                    });
            });
        }
    
        })


        return (
            <div className={Styles.container}>
                <h1 className={Styles.title}>Agendar Turno</h1>
                <form className={Styles.form} onSubmit={formik.handleSubmit}>
                    <div className={Styles.formGroup}>
                        <label htmlFor= "date">Fecha:</label>
                    
                        <input
                        id="date"
                        name="date"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.date}
                        className= {
                            formik.touched.date && formik.errors.date
                            ? Styles.inputError
                            : Styles.input
                        }
                         />
                        {formik.errors.date ? (
                            <div className={Styles.error}>{formik.errors.date}</div>
                        ) : null}
                    </div>
                    <div className={Styles.formGroup}>
                        <label htmlFor="time">Hora:</label>
                        <input
                        id="time"
                        name="time"
                        type="time"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.time}
                        className= {
                            formik.touched.time && formik.errors.time
                            ? Styles.inputError
                            : Styles.input
                        }
                            />
                        {formik.errors.time ? (
                            <div className={Styles.error}>{formik.errors.time}</div>
                        ) : null
                        }
                        </div>
                    
                    <button
                    type="submit"
                    className={Styles.submitButton}
                    disabled={
                        Object.keys(formik.errors).length > 0 }
                        >Agendar Turno
                        </button>
                     </form> 
                    </div>
                
        
        )   
    }

    export default AgendarTurno