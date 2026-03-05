import { Route, Routes, useNavigate, useLocation } from "react-router-dom"
import Home from "./views/Home/Home"
import Misturnos from "./views/Misturnos/Misturnos"
import Register from "./views/Register/Register"
import Login from "./views/Login/Login"
import AgendarTurno from "./components/AgendarTurno/AgendarTurno";
import Navbar from "./components/Navbar/navbar"
import Styles from './App.module.css'
import { useContext, useEffect } from "react"
import Notfound from "./components/NotFound/NotFound"
import fondoClinica from "./assets/clinica.jpg"
import { UsersContext } from "./context/UsersContext"





function App() {
 
  const location = useLocation()
  const { isLogged } = useContext(UsersContext)

  

  const navigate = useNavigate()
  useEffect(() => {
    if(!isLogged && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login')
    }
  }, [isLogged, navigate, location.pathname])




  return (
    <> 
    {
      !isLogged ? 
          <main className={Styles.main}
            style={{ backgroundImage: `url(${fondoClinica})` }}
            >
           <div className= {Styles.overlay}
              
            />
            <div className={Styles.content}>
            <Routes>
              <Route path="/login" element={<Login  />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </Routes>
            </div>
          </main>

      :
      <>
      <header className={Styles.header}>
        <h1 className={Styles.logoText}> Clinica <span className={Styles.logoAccent}>Arias</span></h1>
        <Navbar />
      </header>
      <main
        className={Styles.main}
        style={{ backgroundImage: `url(${fondoClinica})` }}
          >
        <div className={Styles.overlay} />

        <div className={Styles.content}>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/misturnos" element={<Misturnos />} />
          <Route path="/agendarturno" element={<AgendarTurno />} />
          <Route path="*" element={<Notfound />} />
          </Routes>
          </div>
      </main>
      </>
    }
    
    </>
  )
}

export default App
