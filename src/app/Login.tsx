import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View>
        <Text>Login</Text>
        <Pressable onPress={() => router.push("/onboarding/FinalScreen")}>
          <Text>Go Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
