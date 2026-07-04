import { Platform } from 'react-native'

const TOKEN_KEY = 'user-token'

function getStore() {
  if (Platform.OS === 'web') {
    return {
      async getItemAsync(key: string) { return localStorage.getItem(key) },
      async setItemAsync(key: string, value: string) { localStorage.setItem(key, value) },
      async deleteItemAsync(key: string) { localStorage.removeItem(key) },
    }
  }
  try {
    const SecureStore = require('expo-secure-store')
    return {
      async getItemAsync(key: string) { return await SecureStore.getItemAsync(key) },
      async setItemAsync(key: string, value: string) { return await SecureStore.setItemAsync(key, value) },
      async deleteItemAsync(key: string) { return await SecureStore.deleteItemAsync(key) },
    }
  } catch (e) {
    console.log('SECURESTORE REQUIRE FAILED:', e)

    return {
      async getItemAsync(_key: string) { return null },
      async setItemAsync(_key: string, _value: string) {},
      async deleteItemAsync(_key: string) {},
    }
  }
}

const store = getStore()
console.log('STORE TYPE CHECK:', store)

export const tokenStorage = {
    async getToken(): Promise<string | null> {
       try {
        return await store.getItemAsync(TOKEN_KEY)
       } catch (error) {
        console.log('ERROR READING TOKEN, in getToken()', error)
        return null
       }
    },
    async saveToken(token : string): Promise<boolean> {
        try {
           await store.setItemAsync(TOKEN_KEY, token);
           return true;
        } catch (error) {
        console.log('ERROR SAVING TOKEN, in saveToken()', error)
        return false
        }
    },
    async deleteToken(): Promise<boolean> {
        try {
           await store.deleteItemAsync(TOKEN_KEY);
           return true;
        } catch (error) {
        console.log('ERROR CLEARING TOKEN, in deleteToken()', error)
        return false
        }
    },
   

}