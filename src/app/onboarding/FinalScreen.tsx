import AuthButtonsModal from "@/components/onboarding/AuthButtonsModal";
import { onboardingStyles } from "@/components/styles/OnboardingScreenStyles";
import { ExpoLogo } from "@/constants/images/images";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FinalScreen = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={onboardingStyles.container}>
        <Image source={ExpoLogo} style={onboardingStyles.logo} />
      </View>

      {isAuthModalOpen ? (
        <AuthButtonsModal
          visible={isAuthModalOpen}
          onPress={() => setIsAuthModalOpen(false)}
        />
      ) : (
        <>
          <View style={onboardingStyles.finalScreeNoModal}>
            <Text style={onboardingStyles.title}>You've Got This !</Text>
            <Text style={onboardingStyles.subtitle}>
              Let's start celebrating your journey together. Remember, your tiny
              wins matter.
            </Text>
            <Text style={onboardingStyles.subtitle}>Keep Going.</Text>

            <View style={onboardingStyles.buttonContainer}>
              <Pressable
                onPress={() => {
                  setIsAuthModalOpen(!isAuthModalOpen);
                }}
                style={onboardingStyles.button}
              >
                <Text style={onboardingStyles.buttonText}>Get Started</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default FinalScreen;
