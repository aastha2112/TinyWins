import OnboardingScreenStyles from "@/styles/OnboardingScreenStyles";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnboardingScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const FirstScreen = () => {
    return (
      <View style={OnboardingScreenStyles.firstScreenContainer}>
        <View style={OnboardingScreenStyles.textContainer}>
          <Text style={OnboardingScreenStyles.text}>Tiny Progress</Text>
          <Text style={[OnboardingScreenStyles.subText]}>Matters</Text>
        </View>
        <Button title="Next" onPress={() => setCurrentScreen(1)}></Button>
      </View>
    );
  };

  const SecondScreen = () => {
    return (
      <View style={OnboardingScreenStyles.secondScreenContainer}>
        <View style={OnboardingScreenStyles.textContainer}>
          <Text style={OnboardingScreenStyles.text}>No Pressure,</Text>
          <Text style={OnboardingScreenStyles.subText}>No Guilt</Text>
        </View>

        <Button title="Next" onPress={() => setCurrentScreen(2)}></Button>
      </View>
    );
  };

  const GetStartedScreen = () => {
    return (
      <View style={OnboardingScreenStyles.thirdScreenContainer}>
        <View style={OnboardingScreenStyles.textContainer}>
          <Text style={OnboardingScreenStyles.text}>Build Momentum</Text>
          <Text style={OnboardingScreenStyles.subText}>Slowly</Text>
        </View>

        <Pressable onPress={() => setCurrentScreen(0)}>
          <Text style={{ color: "blue" }}>Get Started</Text>
        </Pressable>
      </View>
    );
  };

  const Screens = () => {
    return (
      <View style={OnboardingScreenStyles.container}>
        {currentScreen === 0 ? (
          <FirstScreen />
        ) : currentScreen === 1 ? (
          <SecondScreen />
        ) : (
          <GetStartedScreen />
        )}
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text
            style={{
              fontSize: 45,
              fontWeight: 600,
              color: currentScreen === 0 ? "blue" : "gray",
            }}
          >
            .
          </Text>
          <Text
            style={{
              fontSize: 45,
              fontWeight: 600,
              color: currentScreen === 1 ? "blue" : "gray",
            }}
          >
            .
          </Text>
          <Text
            style={{
              fontSize: 45,
              fontWeight: 600,
              color: currentScreen === 2 ? "blue" : "gray",
            }}
          >
            .
          </Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["lightblue", "white", "pink"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={OnboardingScreenStyles.container}
    >
      <SafeAreaView style={OnboardingScreenStyles.safeArea}>
        <Screens />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnboardingScreen;
