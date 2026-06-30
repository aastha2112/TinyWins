import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'user-token'

export const tokenStorage = {
    async getToken(): Promise<string | null> {
       try {
        return await SecureStore.getItemAsync(TOKEN_KEY)
       } catch (error) {
        console.log('ERROR READING TOKEN, in getToken()', error)
        return null
       }
    },
    async saveToken(token : string): Promise<boolean> {
        try {
           await SecureStore.setItemAsync(TOKEN_KEY, token);
           return true;
        } catch (error) {
        console.log('ERROR SAVING TOKEN, in saveToken()', error)
        return false
        }
    },
    async deleteToken(): Promise<boolean> {
        try {
           await SecureStore.deleteItemAsync(TOKEN_KEY);
           return true;
        } catch (error) {
        console.log('ERROR CLEARING TOKEN, in deleteToken()', error)
        return false
        }
    },
   

}