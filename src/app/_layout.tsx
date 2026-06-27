import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="oboarding/SecondScreen" />
      <Stack.Screen name="oboarding/FinalScreen" />

      <Stack.Screen name="Login" />
      <Stack.Screen name="Register" />

      <Stack.Screen name="(main)" />
    </Stack>
  );
}
