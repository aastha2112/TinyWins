import { Stack } from "expo-router"

const AuthLayout = () => {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" />
            <Stack.Screen name="Register" />
        </Stack>
    )
}

export default AuthLayout;