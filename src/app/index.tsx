import OnboardingButton from "@/components/onboarding/OnboardingButton";
import { onboardingStyles } from "@/components/styles/OnboardingScreenStyles";
import { LogoGlow } from "@/constants/images/images";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const router = useRouter();
  console.log("mounted");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={onboardingStyles.container}>
        <Text style={onboardingStyles.title}>
          A Brighter Way to Build Habits
        </Text>
        <Text style={onboardingStyles.subtitle}>
          Welcome to TinyWins, where every small effort counts. Focus on
          consistency, not completion.
        </Text>
        <Text style={onboardingStyles.subtitle}>Breathe easier.</Text>

        <Image source={LogoGlow} style={onboardingStyles.logo} />
      </View>

      <View style={onboardingStyles.buttonContainer}>
        <OnboardingButton
          onPress={() => router.push("/onboarding/SecondScreen")}
          style={onboardingStyles.button}
        >
          Start Small
        </OnboardingButton>
      </View>
    </SafeAreaView>
  );
}
