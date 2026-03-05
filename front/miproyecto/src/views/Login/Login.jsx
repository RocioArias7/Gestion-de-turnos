import { useFormik } from "formik";
import styles from "./Login.module.css";
import Swal from "sweetalert2";
import { loginFormValidates } from "../../helpers/validates";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";




function Login() {

    const { loginUser } = useContext(UsersContext)

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
            loginUser(values)
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Login exitoso"
                    })
                    navigate("/")
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