/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import axios from "axios";


export const UsersContext = createContext({
    isLogged: "",
    myApp: [],
    loginUser: async () => {},
    logOutUser: () => {},
    getUserAppointments: async () => {},
    scheduleAppointment: async () => {},
    cancelAppointment: async () => {},

})

export const UsersProvider = ({children}) => {

    const [isLogged, setIsLogged] = useState(localStorage.getItem('user') || "")
    const [myApp, setMyApp] =  useState([])


    const loginUser = async (values) => {
        const response = await axios.post("http://localhost:3000/users/login", values)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        setIsLogged(response.data.user)
    }


    const logOutUser = () => {
        localStorage.removeItem("user")
        setIsLogged(false)
    }


    const getUserAppointments = async () => {
        const objetoUser = JSON.parse(isLogged)
        const response = await axios.get (`http://localhost:3000/users/${objetoUser.id}`)
        setMyApp(response.data.appointments)
                  
    }

    const scheduleAppointment = async (values) => {
        const objetoUser = JSON.parse(isLogged)
        const appointmentData = {
            ...values,
            userId: objetoUser.id
        }
            
        await axios.post("http://localhost:3000/appointments/schedule", appointmentData)
    }

    const cancelAppointment = async (id) => {
         await axios.put(`http://localhost:3000/appointments/cancel/${id}`)
         const newMyapp = myApp.map ( (app)  => {
            if(app.id === id){
                app.status = "cancelled"
                return app 
            } else return app 
            })
            setMyApp(newMyapp)
    }





    const value = {
        isLogged,
        myApp,
        loginUser,
        logOutUser,
        getUserAppointments,
        scheduleAppointment,
        cancelAppointment
        
    }



    return(
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}