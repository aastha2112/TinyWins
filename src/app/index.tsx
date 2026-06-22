import HomeScreen from "@/screens/HomeScreen";
import { createNativeStackNavigator } from "expo-router/build/react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return <HomeScreen />;
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen name="Home" component={HomeScreen} />
  //       <Stack.Screen name="Details" component={OnboardingScreen} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}
