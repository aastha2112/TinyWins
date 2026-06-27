import { onboardingStyles } from "@/components/styles/OnboardingScreenStyles";
import { ReactLogo } from "@/constants/images/images";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SecondScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={onboardingStyles.container}>
        <Text style={onboardingStyles.title}>Small Wins, Big Impact</Text>
        <Text style={onboardingStyles.subtitle}>
          Build momentum, one task at a time. It's about showing up, not doing
          it all.
        </Text>
        <Text style={onboardingStyles.subtitle}>
          Celebrate showing up today.
        </Text>

        <Image source={ReactLogo} style={onboardingStyles.logo} />
      </View>

      <View style={onboardingStyles.buttonContainer}>
        <Pressable
          onPress={() => router.push("/onboarding/FinalScreen")}
          style={onboardingStyles.button}
        >
          <Text style={onboardingStyles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SecondScreen;
