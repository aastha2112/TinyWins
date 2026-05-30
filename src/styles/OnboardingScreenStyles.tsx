import { StyleSheet } from "react-native";

const OnboardingScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  firstScreenContainer: {
    flex: 0.9,
    justifyContent: "space-around",
    alignItems: "center",
  },
  secondScreenContainer: {
    flex: 0.9,
    justifyContent: "space-around",
    alignItems: "center",
  },
  thirdScreenContainer: {
    flex: 0.9,
    justifyContent: "space-around",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 22,
    marginBottom: 15,
  },
  subText: {
    color: "gray",
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 105,
  },
});

export default OnboardingScreenStyles;
