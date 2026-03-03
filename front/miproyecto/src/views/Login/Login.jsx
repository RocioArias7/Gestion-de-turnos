import { useFormik } from "formik";
import styles from "./Login.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { loginFormValidates } from "../../helpers/validates";
import { Link, useNavigate } from "react-router-dom";



function Login({setIslogged}) {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        initialErrors: {
            username: "El nombre de usuario es requerido",
            password: "La contraseña es requerida",
        },
        validate: loginFormValidates,
        onSubmit: (values) => {
            axios.post("http://localhost:3000/users/login", values)
                .then((response) => {
                    Swal.fire({
                        icon: 'success',
                        title: "Login exitoso",

                    })
                    setIslogged(true)
                    navigate('/')
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: error.response.data.msg,
                    })
                })
        }
    })

    return (
        
        <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
            <h2 className={styles.formTitle}> Formulario de Login</h2>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Username:</label>
                <input
                    className={styles.formInput}
                    type="text"
                    name="username"
                    placeholder="Tu nombre de usuario"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                    <label className={styles.errorLabel}>{formik.errors.username}</label>
                ) : null}
            </div>


            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Password:</label>
                <input
                    className={styles.formInput}
                    type="password"
                    name="password"
                    placeholder="Tu contraseña"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <label className={styles.errorLabel}>{formik.errors.password}</label>
                ) : null}
            </div>

            <button 
            className={styles.formButton}
            type="submit"
            disabled={
                Object.keys(formik.errors).length > 0 ||
                !formik.values.username ||
                !formik.values.password
            }
            >
                Iniciar Sesión
             
             
             </button>
             <br />
             <label>
                Aun no tienes una cuenta? <Link to="/register"> Registrate </Link>
             </label>
        </form>
    )
}

export default Login