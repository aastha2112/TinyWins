import { tokenStorage } from "@/utils/tokenStorage"
import { createContext, useContext, useState } from "react"
import { Alert } from "react-native"



export const AuthContext = createContext<{
    user: {} | null,
    token: string | null,
    isLoading: boolean,
    isAuthenticated: boolean,
    login: (token: string, user:{name?:string, email: string, password: string})=>void,
    logout: ()=>void,
    register: ()=>void,
}>({
    user: null ,
    token: '',
    isLoading: false,
    isAuthenticated: false,
    login: ()=>{},
    logout: ()=>{},
    register: ()=>{},
})
const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [user, setUser] = useState<{
        name?:string,
        email: string,
        password: string
    } | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const register = async()=>{}
    const login = async(token: string, user:{name?:string, email: string, password: string
    })=>{
        setIsLoading(true)
        try{
            await tokenStorage.saveToken(token)
            await setUser(user)
            setToken(token)
            setIsAuthenticated(true)
        }catch(err){
            console.log(err, 'Login not working')
            Alert.alert('Login Failed !!', String(err))
        }finally{
            setIsLoading(false)
        }
    }
    const logout = async()=>{
        await tokenStorage.deleteToken()
        setUser(null)
        setToken(null)
        setIsAuthenticated(false)
    }


  return (
    <AuthContext.Provider value={{user, token, isLoading, isAuthenticated, login, logout, register}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

export const useAuth = () => {
    return useContext(AuthContext)
}