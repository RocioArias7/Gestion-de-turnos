import { Link, useNavigate } from "react-router-dom";    
import Styles from "./Navbar.module.css";
import Swal from "sweetalert2";



function Navbar({setIslogged}) {

    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem("user")
        navigate('/login')
        setIslogged(false)
        Swal.fire({
            icon: 'warning',
            title: "LogOut exitoso!",
        })
    }
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
                <li className={Styles.navLink} onClick={handleLogOut}>
                    LogOut
                </li>
                </nav>
        </div>
    )
}
    





       
export default Navbar;