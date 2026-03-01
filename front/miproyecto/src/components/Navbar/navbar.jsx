import { Link } from "react-router-dom";    
import Styles from "./Navbar.module.css";



function Navbar() {
    return (
        
             <div className={Styles.navbarContainer}>
            <nav className={Styles.navbar}>
                <li className={Styles.navItem}>
                    <Link
                    to="/"
                    className={`${Styles.navLink} ${location.pathname === '/' ? Styles.active : ''}`}
                    >
                    Home
                    </Link>
                </li>
                <li className={Styles.navItem}>
                    <Link
                    to="/misturnos"
                    className={`${Styles.navLink} ${location.pathname === '/' ? Styles.active : ''}`}
                    >
                    Mis turnos
                    </Link>
                </li>
                <li className={Styles.navLink}>
                    Logout
                </li>
                </nav>
        </div>
    )
}
    





       
export default Navbar;