import { Link } from "react-router-dom";
import Styles from "./NotFound.module.css";

function NotFound() {
    return (
        <div className={Styles.container}>
            <h1 className={Styles.title}>404</h1>
            <p className={Styles.message}>Lo sentimos, la página que estás buscando no existe.</p>
            <Link to="/" className={Styles.homeButtom}>Volver al inicio</Link>
        </div>
    )
}   
export default NotFound