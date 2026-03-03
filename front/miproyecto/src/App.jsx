import { Route, Routes, useNavigate, useLocation } from "react-router-dom"
import Home from "./views/Home/Home"
import Misturnos from "./views/Misturnos/Misturnos"
import Register from "./views/Register/Register"
import Login from "./views/Login/Login"
import Navbar from "./components/Navbar/navbar"
import Styles from './App.module.css'
import { useEffect, useState } from "react"
import Notfound from "./components/NotFound/NotFound"
import fondoClinica from "./assets/clinica.jpg"




function App() {
  const location = useLocation()

  const [islogged, setIslogged] = useState(localStorage.getItem('user'))


  const navigate = useNavigate()
  useEffect(() => {
    if(!islogged && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login')
    }
  }, [islogged])




  return (
    <> 
    {
      !islogged ? 
          <main className={Styles.main}
            style={{
            backgroundImage: `url(${fondoClinica})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            position: "relative",
          }}
          >
           <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(255, 255, 255, 0.65)",
                zIndex: 0
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
            <Routes>
              <Route path="/login" element={<Login setIslogged={setIslogged} />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            </div>
            </main>

      :
      <>
      <header className={Styles.header}>
        <h1 className={Styles.logoText}> Clinica <span className={Styles.logoAccent}>Arias</span></h1>
        <Navbar setIslogged={setIslogged}/>
      </header>
      <main
      style={{
            backgroundImage: `url(${fondoClinica})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            position: "relative",
          }}>
            <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.65)",
                  zIndex: 0
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/misturnos" element={<Misturnos />} />
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
