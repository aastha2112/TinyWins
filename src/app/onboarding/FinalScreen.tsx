import { onboardingStyles } from "@/components/styles/OnboardingScreenStyles";
import { LogoGlow } from "@/constants/images/images";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FinalScreen = () => {
  console.log("final");
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={onboardingStyles.container}>
        <Text style={onboardingStyles.title}>You've Got This !</Text>
        <Text style={onboardingStyles.subtitle}>
          Let's start celebrating your journey together. Remember, your tiny
          wins matter.
        </Text>
        <Text style={onboardingStyles.subtitle}>Keep Going.</Text>

        <Image source={LogoGlow} style={onboardingStyles.logo} />
      </View>

      <View style={onboardingStyles.buttonContainer}>
        <Pressable
          onPress={() => router.replace("/Home")}
          style={onboardingStyles.button}
        >
          <Text style={onboardingStyles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default FinalScreen;
