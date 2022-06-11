import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const router = useRouter()

    const [ loggingIn, setLoggingin ] = useState(false)
    const [ auth, setAuth ] = useState({})
    const [ email, setEmail ] = useState('')

    useEffect( () => {
        const authenticate = async () => {
            const token = localStorage.getItem('XpDZcaMrAgjT3D8u')
            if(!token) {
                return
            }
            
            const config = {
                headers: {
                    "Content-Type": "application-json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axios.post('/api/profile', { config })
                setAuth(data)
                router.push('/dashboard')
                setLoggingin(false)
            } catch (error) {
                setAuth({})
            }
        }
        authenticate()
    }, [loggingIn])

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            email,
            setEmail,
            setLoggingin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext
