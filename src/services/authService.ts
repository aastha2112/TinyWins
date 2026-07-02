import { tokenStorage } from "@/utils/tokenStorage";
import { apiClient } from "./api";


export const authService =  {
    async register(payload: Record<string, any>){
        const data = await apiClient('/auth/register', {
            method: 'POST',
            body: JSON.stringify(payload),
            requireAuth: false
        })

        if(data.access_token){
           await tokenStorage.saveToken(data.access_token) 
        }
        return { access_token: data.access_token, user: data.user }
    },

    async login(payload: Record<string, any>){
        const data = await apiClient('/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload),
            requireAuth: false
        })
        if(data.access_token){
            await tokenStorage.saveToken(data.access_token) 
         }
         return { access_token: data.access_token, user: data.user }
    },

    async logout(){
        await tokenStorage.deleteToken()
    }
}