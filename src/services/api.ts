import { Alert } from 'react-native';
import {tokenStorage} from '../utils/tokenStorage';

const BASE_URL = 'http://10.0.2.2:8080';

interface RequestOptions extends RequestInit{
    requireAuth? : boolean
}

export const apiClient = async (endpoint : string, options: RequestOptions = {})=>{

    const {requireAuth = true, ...customOptions} = options

    const headers : Record<string, string> =  {
      "content-type": "application/json",
      ...((customOptions.headers as Record<string, string>) || {})
    }

    if(requireAuth){
        const token = await tokenStorage.getToken()
        if (token){
            headers['Authorization'] = `Bearer ${token}`
        }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers, 
        ...customOptions
    })

    const data = await response.json()
    
    if(!response.ok){
        console.log('RESPONSE NOT OK')
        if(response.status === 401){
            await tokenStorage.deleteToken()
        }
        Alert.alert(data.message)
        throw new Error(data.message || 'Something went wrong')

    }

    return data
}