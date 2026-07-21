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
    console.log('APICLIENT CALLING', endpoint, customOptions)

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers, 
        ...customOptions
    })
    console.log('APICLIENT RESPONSE STATUS', response.status)

    const data = await response.json()
    console.log('APICLIENT DATA', data)

    if(!response.ok){
        if(response.status === 401){
            await tokenStorage.deleteToken()
        }
        throw new Error(data.message || 'Something went wrong')

    }

    return data
}