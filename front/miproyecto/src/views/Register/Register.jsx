import axios from 'axios';
import { registerFormValidates } from '../../helpers/validates';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';


function Register() {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            birthdate: "",
            nDni: "",
            username: "",
            password: "",
        },
        initialErrors: {
            name: "El nombre es requerido",
            email: "El email es requerido",
            birthdate: "La fecha de nacimiento es requerida",
            nDni: "El número de DNI es requerido",
            username: "El nombre de usuario es requerido",
            password: "La contraseña es requerida",
        },
        validate: registerFormValidates,
        onSubmit: (values) => {
            axios.post("http://localhost:3000/users/register", values)
                .then((response) => {
                    Swal.fire({
                        icon: 'success',
                        title: response.data.message,
                        text: "¡Registro exitoso!"
                    })
                })
                .catch((error) => {
                  
                  if(error.response.data.msg.includes("username")) {
                    Swal.fire({
                        icon: 'error',
                        title: error.response.data.msg,
                        text: "Elige otro nombre de usuario"
                    })
                  }
                    if(error.response.data.msg.includes("email")) {
                        Swal.fire({
                            icon: 'error',
                            title: `El mail ${formik.values.email} ya está registrado`,
                            text: "Intentelo nuevamente"
                        })
                      }
                      if(error.response.data.msg.includes("nDni")) {
                        Swal.fire({
                            icon: 'error',
                            title: `El número de DNI ${formik.values.nDni} ya está registrado`,
                            text: "Intentelo nuevamente"
                        })
                      }
                  
                    })
                  }
                });
             

return (
  <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
    <h2 className={styles.formTitle}>Formulario de Registro</h2>

    <div className={styles.formGroup}>
      <label className={styles.formLabel}>Nombre:</label>

      <input
        className={styles.formInput}
        type="text"
        name="name"
        placeholder="Tu nombre"
        onChange={formik.handleChange}
       
      />

      {formik.errors.name && formik.touched.name ? (
        <label className={styles.errorLabel}>
          {formik.errors.name}
        </label>
      ) : null}

    </div>

    <div className={styles.formGroup}>
        <label className={styles.formLabel}>Email:</label>
        <input
          className={styles.formInput}
          type="text"
          name="email"
          placeholder="mail@mail.com"
          onChange={formik.handleChange}
    
        />
        {formik.errors.email && formik.touched.email ? (
          <label className={styles.errorLabel}>
            {formik.errors.email}
          </label>
        ) : null}
      </div>

    <div className={styles.formGroup}>
        <label className={styles.formLabel}>Fecha de Nacimiento:</label>
        <input
          className={styles.formInput}
          type="date"
          name="birthdate"
          onChange={formik.handleChange}
         
        />
        {formik.errors.birthdate && formik.errors.birthdate ? (
          <label className={styles.errorLabel}>
            {formik.errors.birthdate}
          </label>
        ) : null}
      </div>
    
    <div className={styles.formGroup}>
        <label className={styles.formLabel}>nDni:</label>
        <input
          className={styles.formInput}
          type="text"
          name="nDni"
          onChange={formik.handleChange}
       
        />
        {formik.errors.nDni && formik.errors.nDni ? (
          <label className={styles.errorLabel}>
            {formik.errors.nDni}
          </label>
        ) : null}
      </div>

    <div className={styles.formGroup}>
        <label className={styles.formLabel}>Username:</label>
        <input
          className={styles.formInput}
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          onChange={formik.handleChange}
         
        />
        {formik.errors.username && formik.errors.username ? (
          <label className={styles.errorLabel}>
            {formik.errors.username}
          </label>
        ) : null}
      </div>

    <div className={styles.formGroup}>
        <label className={styles.formLabel}>Password:</label>
        <input
          className={styles.formInput}
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.errors.password ? (
          <label className={styles.errorLabel}>
            {formik.errors.password}
          </label>
        ) : null}
      </div>

    <button
        className={styles.submitButton}
        type="submit"
        disabled= {
            Object.keys(formik.errors).length > 0 ||
            !formik.values.name ||
            !formik.values.email ||
            !formik.values.birthdate ||
            !formik.values.nDni ||
            !formik.values.username ||
            !formik.values.password
        }
        >
        Registrarse
        
      </button>
      <label>
        Ya tienes una cuenta? <Link to="/login"> Inicia Sesión </Link>
      </label>
  </form>
);

}

export default Register