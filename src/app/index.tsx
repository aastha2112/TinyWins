import OnboardingScreen from "@/screens/OnboardingScreen";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <OnboardingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
