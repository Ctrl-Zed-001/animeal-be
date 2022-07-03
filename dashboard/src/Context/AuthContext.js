import axios from "axios"
import { useState, useEffect, createContext } from "react"
import Loader from "../components/Loader"
import Login from '../screens/Login'
import toast, { Toaster } from 'react-hot-toast';

export const AuthContext = createContext()


const AuthContextProvider = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token) {
            // TODO GET USER INFORMATION VIA API
            setIsAuthenticated(true)
            setIsLoading(false)
        } else {
            setIsAuthenticated(false)
            setIsLoading(false)
        }
    }, [])

    const login = (username, password) => {
        axios.post(`${process.env.REACT_APP_API_URI}/auth/adminlogin`, {
            username: username,
            password: password
        })
            .then(res => {
                setIsLoading(true)
                setUser(res.data.data)
                localStorage.setItem('token', res.data.token)
                setIsAuthenticated(true)
                setIsLoading(false)
            })
            .catch(err => {
                toast.error('incorrect credentials')
            })
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated
            }}
        >
            <Toaster />
            {
                isLoading ?
                    <Loader /> :
                    isAuthenticated ?
                        props.children :
                        <Login login={login} />
            }
        </AuthContext.Provider>
    )
}
export default AuthContextProvider