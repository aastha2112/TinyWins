import { Stack, useRouter } from "expo-router";
import AuthProvider, { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

function InnerLayout() {
  const {isAuthenticated, isLoading} = useAuth()
  const router = useRouter()

useEffect(()=>{
  if( !isLoading && isAuthenticated){
    router.replace('/(tabs)/home')
  }
},[isAuthenticated, isLoading])

if(isLoading){
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={"large"}/>
    </View>
  )
}

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding/SecondScreen" />
      <Stack.Screen name="onboarding/FinalScreen" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="create-habit" options={{ presentation: 'modal', headerShown: true, title: 'New Habit' }} />
    </Stack>
  );
}


export default function RootLayout(){
  return (
    <AuthProvider>
      <InnerLayout/>
    </AuthProvider>
  )
}