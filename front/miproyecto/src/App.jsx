import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./views/Home/Home"
import Misturnos from "./views/Misturnos/Misturnos"
import Register from "./views/Register/Register"
import Login from "./views/Login/Login"
import Navbar from "./components/Navbar/navbar"
import Styles from './App.module.css'

import { useEffect, useState } from "react"

function App() {

  const [islogged, setIslogged] = useState(false)


  const navigate = useNavigate()
  useEffect(() => {
    if(!islogged && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login')
    }
  }, [islogged, navigate])




  return (
    <> 
    {
      islogged ? 
          <main className={Styles.main}>
            <Routes>
              <Route path="/login" element={<Login setIslogged={setIslogged} />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            </main>

      :
      <>
      <header>
        <span> Logo </span>
        <Navbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/misturnos" element={<Misturnos />} />
          </Routes>
      </main>\
      </>
    }
    
    </>
  )
}

export default App
