import {Link}  from 'react-router-dom'
import Styles from "./Home.module.css"

const Home = () => {
    return (
    <div className={Styles.hero}>
        <h1 className={Styles.title}>Bienvenido a Clinica Arias</h1>
        <p className={Styles.subtitle}>Tu salud es nuestra prioridad</p>
        <p className={Styles.description}>
            En Clinica Arias ofrecemos atención médica de calidad para toda la familia!
                            Quieres agendar un turno? Haz click aquí!</p>
         <Link to="/agendarturno" className={Styles.link}>
            Agendar
        </Link>
    </div>
)
   
}

export default Home