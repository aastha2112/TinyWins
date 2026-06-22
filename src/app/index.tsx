import HomeScreen from "@/screens/HomeScreen";
import OnboardingScreen from "@/screens/OnboardingScreen";
import { NavigationContainer } from "expo-router/build/react-navigation";
import { createNativeStackNavigator } from "expo-router/build/react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Stack.Screen options={{ headerShown: false }} />
      <OnboardingScreen /> */}

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={OnboardingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
