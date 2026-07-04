import {jwtDecode} from 'jwt-decode'


interface JwtCustomPayload {
    sub: string
     email: string
     name: string
}

export const decodeToken= (token: string)=>{
 try {
    if(token){
        const decoded = jwtDecode<JwtCustomPayload>(token)
        return decoded
    }else{
        return null
    }
 } catch (error) {
    console.log('JWT DECODE FAILED', error)
    return null
 }
}