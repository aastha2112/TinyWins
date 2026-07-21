import AuthButtonsModal from "@/components/onboarding/AuthButtonsModal";
import { OnboardingStep } from "@/components/onboarding/OnboardingScreen";
import { LogoGlow } from "@/constants/images/images";
import { theme } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const OnboardingThree = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <OnboardingStep
        title={`Ready for your first tiny win?`}
        body={`Focus on one small action you can do right now. Tomorrow's success begins with today's tiny win.`}
        buttonText={`Let's begin`}
        activeDotIndex={2}
        imageSrc={LogoGlow}
        onButtonPress={() => setIsModalVisible(true)}
      />

      {isModalVisible && <View style={styles.darkOverlay} />}

      <AuthButtonsModal
        visible={isModalVisible}
        onPress={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default OnboardingThree;

const styles = StyleSheet.create({
  darkOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    zIndex: 99,
  },
});
