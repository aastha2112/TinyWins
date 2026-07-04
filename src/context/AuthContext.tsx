import { authService } from "@/services/authService";
import { User } from "@/types/auth.types";
import { decodeToken } from "@/utils/decodeToken";
import { tokenStorage } from "@/utils/tokenStorage";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext<{
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  register: (email: string, password: string, name?: string) => Promise<void>;
}>({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  register: async () => {},
});
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const register = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      const data = await authService.register({ name, email, password });
      await tokenStorage.saveToken(data.access_token);
      setUser(data.user);
      setToken(data.access_token);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err, "Register not working");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string, user: User) => {
    setIsLoading(true);
    try {
      await tokenStorage.saveToken(token);
      const check = await tokenStorage.getToken()
console.log('IMMEDIATE CHECK AFTER SAVE:', check)
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err, "Login not working");
      Alert.alert("Login Failed !!", String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await tokenStorage.deleteToken();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  useEffect(()=>{

    const bootstrapAuth = async () => {
        try {
            setIsLoading(true)
            const token = await tokenStorage.getToken()
            console.log('BOOTSTRAP - token from storage:', token)

            if(token){
                const result = decodeToken(token)
                console.log(result, 'token decoded')
                console.log('BOOTSTRAP - decoded:', result)

                if(result){
                    setUser({id: result.sub, email: result.email, name: result.name })
                    setToken(token)
                    setIsAuthenticated(true)
                }
             }
        } catch (error) {
            console.log(error, 'Bootstrap auth FAILED')
        } finally {
            setIsLoading(false)
        }
    }
   
    bootstrapAuth()
   
  },[])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
