import { StyleSheet } from "react-native";

export const onboardingStyles = StyleSheet.create({
  container: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 0,
    paddingBottom: 50,
    paddingTop: 30,
    paddingHorizontal: 22,
  },
  title: {
    color: "black",
    fontSize: 28,
    fontWeight: "800",
    width: "100%",
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
    width: "100%",
  },
  logo: {
    width: 450,
    height: 450,
    resizeMode: "contain",
  },
  finalScreeNoModal: {
    flex: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    paddingBottom: 20,
    alignContent: "center",
    justifyContent: "center",
    gap: 15,
    textAlign: "center",
  },
  buttonContainer: {
    paddingBottom: 20,
    alignItems: "center",
  },
  button: {
    width: "60%",
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 50,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
  },
});
